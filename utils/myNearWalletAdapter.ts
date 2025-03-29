import type { SignMessageParams, SignedMessage } from "@near-wallet-selector/core/src/lib/wallet/wallet.types"
import { z } from "zod"

import type { SignAndSendTransactionsParams } from "@src/types/interfaces"

type TransactionHashes = string

const signedMessageSchema = z.object({
  accountId: z.string(),
  publicKey: z.string(),
  signature: z.string(),
  state: z.string().optional(),
})

const errorSchema = z.object({
  error: z.string(),
})

const signMessageSchema = z.object({
  message: z.string(),
  recipient: z.string(),
  nonce: z.instanceof(Buffer),
  callbackUrl: z.string().optional(),
  state: z.string().optional(),
})

const windowMessageSchema = z.union([
  signedMessageSchema,
  errorSchema,
  z.object({
    errorCode: z.string(),
    errorMessage: z.string(),
  }),
  z.object({
    transactionHashes: z.string(),
  }),
])

interface SignOutput {
  signatureData: SignedMessage
  signedData: SignMessageParams
}

export const signMessageInNewWindow = async ({
  params,
  signal,
}: {
  signal: AbortSignal
  params: SignMessageParams
}): Promise<SignOutput> => {
  const completeAbortCtrl = new AbortController()

  const channelId = crypto.randomUUID()

  /**
   * It is important to specify callbackUrl, otherwise near wallet SDK will
   * implicitly set `callbackUrl` to the current URL. As a result, the NEP-413
   * message will be different from ours, and we won't be able to verify the
   * signature.
   */
  params = { ...params, callbackUrl: getGatewayURL(channelId).toString() }

  const promise = new Promise<SignOutput>((resolve, reject) => {
    openWindowWithMessageHandler({
      url: makeSignUrl(params, channelId),
      channelId,
      onMessage: (message) => {
        const parsedMessage = windowMessageSchema.safeParse(message)

        if (!parsedMessage.success) {
          reject(new Error("Invalid message", { cause: parsedMessage.error }))
          return
        }

        switch (true) {
          case "signature" in parsedMessage.data:
            resolve({ signatureData: parsedMessage.data, signedData: params })
            return
          case "error" in parsedMessage.data:
            reject(new Error(parsedMessage.data.error))
            return
          default:
            throw new Error("exhaustive check")
        }
      },
      onClose: () => {
        reject(new Error("Window closed"))
      },
      signal: anySignal([signal, completeAbortCtrl.signal]),
    })
  })

  return abortablePromise(promise, signal).finally(() => {
    // Teardown `openWindowWithMessageHandler`
    completeAbortCtrl.abort()
  })
}

export const signAndSendTransactionsInNewWindow = async ({
  params,
  signal,
}: {
  signal: AbortSignal
  params: SignAndSendTransactionsParams
}): Promise<TransactionHashes> => {
  const completeAbortCtrl = new AbortController()

  const channelId = crypto.randomUUID()

  const promise = new Promise<TransactionHashes>((resolve, reject) => {
    openWindowWithMessageHandler({
      url: makeSignAndSendTransactionsUrl(params, channelId),
      channelId,
      onMessage: (message) => {
        const parsedMessage = windowMessageSchema.safeParse(message)

        if (!parsedMessage.success) {
          reject(new Error("Invalid message", { cause: parsedMessage.error }))
          return
        }

        switch (true) {
          case "transactionHashes" in parsedMessage.data:
            resolve(parsedMessage.data.transactionHashes)
            return
          case "errorCode" in parsedMessage.data:
            reject(new Error(parsedMessage.data.errorMessage))
            return
          default:
            throw new Error("exhaustive check")
        }
      },
      onClose: () => {
        reject(new Error("Window closed"))
      },
      signal: anySignal([signal, completeAbortCtrl.signal]),
    })
  })

  return promise
}

function getGatewayURL(channelId: string): URL {
  const url = new URL("my-near-wallet-gateway/", window.location.origin)
  url.searchParams.set("channelId", channelId)
  return url
}

function makeSignUrl(params: SignMessageParams, channelId: string) {
  const serializedParams = serializeSignMessageParams(params)

  const url = getGatewayURL(channelId)
  url.searchParams.set("action", "signMessage")
  url.searchParams.set("params", serializedParams)

  return url.toString()
}

function makeSignAndSendTransactionsUrl(params: SignAndSendTransactionsParams, channelId: string) {
  const serializedParams = serializeSignAndSendTransactionsParams(params)

  const url = getGatewayURL(channelId)
  url.searchParams.set("action", "signAndSendTransactions")
  url.searchParams.set("params", serializedParams)

  return url.toString()
}

export function serializeSignAndSendTransactionsParams(params: SignAndSendTransactionsParams) {
  const encodedParams = {
    ...params,
  }
  return JSON.stringify(encodedParams)
}

export function deserializeSignAndSendTransactionsParams(params: string): SignAndSendTransactionsParams {
  return JSON.parse(params)
}

export function serializeSignMessageParams(params: SignMessageParams) {
  const encodedParams = {
    ...params,
    nonce: params.nonce.toString("base64"),
  }
  return JSON.stringify(encodedParams)
}

export function deserializeSignMessageParams(params: string): SignMessageParams {
  const obj = JSON.parse(params)
  return signMessageSchema.parse({
    ...obj,
    nonce: Buffer.from(obj.nonce, "base64"),
  })
}

function openWindowWithMessageHandler({
  url,
  channelId,
  onMessage,
  onClose,
  signal,
}: {
  url: string
  channelId: string
  onMessage: (data: unknown) => void
  onClose: () => void
  signal: AbortSignal
}) {
  const width = 800
  const height = 800
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  const win = window.open(url, "_blank", `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars`)

  if (win != null) {
    // Need to clean opener to prevent security issues;
    //  also, MyNearWallet does not redirect back, when `window.opener` is present.
    // We can't use `noopener` rule because we need to have a reference to the window
    // to track if it's closed or not.
    win.opener = null
  }

  const interval = setInterval(() => {
    if (win?.closed) {
      cleanup()
      onClose?.()
    }
  }, 1000)

  const channel = new BroadcastChannel(channelId)

  const messageHandler = (event: MessageEvent) => {
    onMessage(event.data)
  }

  channel.addEventListener("message", messageHandler)
  signal.addEventListener("abort", cleanup, { once: true })

  function cleanup() {
    clearInterval(interval)
    channel.close()
  }
}

/**
 * Returns a promise that resolves when either the promise or the signal is aborted
 */
function abortablePromise<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      if (signal.aborted) {
        return reject(signal.reason || new Error("Operation aborted"))
      }
      signal.addEventListener("abort", () => {
        reject(signal.reason || new Error("Operation aborted"))
      })
    }),
  ])
}

// AbortSignal.any polyfill
function anySignal(iterable: AbortSignal[]): AbortSignal {
  if (typeof AbortSignal.any === "function") {
    return AbortSignal.any(iterable)
  }

  const controller = new AbortController()

  function abort() {
    controller.abort()
    clean()
  }

  function clean() {
    for (const signal of iterable) signal.removeEventListener("abort", abort)
  }

  for (const signal of iterable) {
    if (signal.aborted) {
      controller.abort(signal.reason)
      break
    }
    signal.addEventListener("abort", abort)
  }

  return controller.signal
}

