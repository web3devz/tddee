"use client"

import { CopyIcon, EnterIcon } from "@radix-ui/react-icons"
import { Callout, Separator, Text } from "@radix-ui/themes"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import NetworkIcon from "@src/components/Network/NetworkIcon"
import { ChainType, useConnectWallet } from "@src/hooks/useConnectWallet"
import useShortAccountId from "@src/hooks/useShortAccountId"
import { getChainIconFromId } from "@src/hooks/useTokensListAdapter"
import { MapsEnum } from "@src/libs/de-sdk/utils/maps"

type WalletConnectionState = {
  chainIcon: string
  chainName: string
  chainLabel: string
  accountId: string | null
  index: number
}

type WalletConnectionActions = {
  onDisconnect: () => void
  onConnect?: () => void
  onCopy: () => void
  isCopied: boolean
}

const connections: MapsEnum[] = [
  MapsEnum.NEAR_MAINNET,
  MapsEnum.EVM_ETHEREUM,
  MapsEnum.BTC_MAINNET,
  MapsEnum.SOLANA_MAINNET,
  MapsEnum.WEBAUTHN,
]

const WalletConnectionsConnector = ({
  accountId,
  chainName,
  chainLabel,
  chainIcon,
  onCopy,
  isCopied,
  onDisconnect,
}: WalletConnectionState & WalletConnectionActions) => {
  const { shortAccountId } = useShortAccountId(accountId ?? "")
  return (
    <div className="flex flex-col justify-between items-center gap-2.5">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <NetworkIcon chainIcon={chainIcon} chainName={chainName} isConnect={!!accountId} />

          <div className="flex flex-col">
            <Text size="2" weight="medium">
              {shortAccountId}
            </Text>
            <Text size="2" weight="medium" color="gray">
              {chainLabel}
            </Text>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2.5">
          <CopyToClipboard onCopy={onCopy} text={accountId ?? ""}>
            <button
              type="button"
              className={clsx(
                "w-[32px] h-[32px] flex justify-center items-center rounded-full border border-gray-500 dark:border-white",
                isCopied && "bg-primary border-0 text-white",
              )}
            >
              <CopyIcon width={16} height={16} />
            </button>
          </CopyToClipboard>
          <button
            type="button"
            onClick={onDisconnect}
            className="w-[32px] h-[32px] flex justify-center items-center rounded-full bg-white-200 dark:border dark:border-white"
          >
            <EnterIcon width={16} height={16} />
          </button>
        </div>
      </div>

      <Separator orientation="horizontal" size="4" />
    </div>
  )
}

const WalletConnections = () => {
  const { state, signOut } = useConnectWallet()
  const [copyWalletAddress, setCopyWalletAddress] = useState<MapsEnum>()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Finalize state update after forced re-render
    if (isProcessing) setIsProcessing(false)
  }, [isProcessing])

  const userAddress = state.address
  if (userAddress == null) {
    return null
  }

  return (
    <div className="flex flex-col">
      <Text size="1" weight="medium" className="text-gray-600 dark:text-gray-500 pb-2">
        Connected with
      </Text>
      {connections.map((connector, i) => {
        let chainIcon = ""
        switch (connector) {
          case MapsEnum.NEAR_MAINNET:
            if (state.chainType !== ChainType.Near) {
              return null
            }
            return (
              <WalletConnectionsConnector
                accountId={userAddress}
                chainLabel="NEAR Protocol"
                chainName="near"
                chainIcon={getChainIconFromId(`${MapsEnum.NEAR_MAINNET}:0`)}
                onCopy={() => setCopyWalletAddress(MapsEnum.NEAR_MAINNET)}
                isCopied={copyWalletAddress === MapsEnum.NEAR_MAINNET}
                onDisconnect={() => {
                  signOut({ id: ChainType.Near })
                }}
                key={connector}
                index={i}
              />
            )
          case MapsEnum.EVM_ETHEREUM:
            if (state.chainType !== ChainType.EVM) {
              return null
            }
            chainIcon = getChainIconFromId("eth")
            return (
              <WalletConnectionsConnector
                accountId={userAddress}
                chainLabel={state?.network ?? ""}
                chainName="eth"
                chainIcon={chainIcon}
                onCopy={() => setCopyWalletAddress(MapsEnum.EVM_ETHEREUM)}
                isCopied={copyWalletAddress === MapsEnum.EVM_ETHEREUM}
                onDisconnect={() => signOut({ id: ChainType.EVM })}
                onConnect={() => {}}
                key={connector}
                index={i}
              />
            )
          case MapsEnum.SOLANA_MAINNET:
            if (state.chainType !== ChainType.Solana) {
              return null
            }
            chainIcon = getChainIconFromId("sol")
            return (
              <WalletConnectionsConnector
                accountId={userAddress}
                chainLabel={state?.network ?? ""}
                chainName="sol"
                chainIcon={chainIcon}
                onCopy={() => setCopyWalletAddress(MapsEnum.SOLANA_MAINNET)}
                isCopied={copyWalletAddress === MapsEnum.SOLANA_MAINNET}
                onDisconnect={() => signOut({ id: ChainType.Solana })}
                onConnect={() => {}}
                key={connector}
                index={i}
              />
            )

          case MapsEnum.WEBAUTHN: {
            if (state.chainType !== ChainType.WebAuthn) {
              return null
            }
            return (
              <PasskeyConnectionInfo
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={i}
                credential={userAddress}
                onSignOut={() => signOut({ id: ChainType.WebAuthn })}
              />
            )
          }
          default:
            return null
        }
      })}
    </div>
  )
}

export default WalletConnections

function PasskeyConnectionInfo({ credential, onSignOut }: { credential: string; onSignOut: () => void }) {
  return (
    <div className="flex flex-col justify-between gap-2.5">
      <div className="flex items-center gap-3">
        <Image src="/static/icons/wallets/webauthn.svg" alt="" width={36} height={36} />

        <div className="flex-1">
          <div className="text-sm font-medium text-gray-12">passkey</div>
          <div className="text-xs font-medium text-gray-11">{`${credential.slice(0, 6)}...${credential.slice(-6)}`}</div>
        </div>

        <button
          type="button"
          onClick={onSignOut}
          className="w-[32px] h-[32px] flex justify-center items-center rounded-full bg-white-200 dark:border dark:border-white"
        >
          <EnterIcon width={16} height={16} />
        </button>
      </div>

      <Separator orientation="horizontal" size="4" />

      <Callout.Root className="bg-warning px-3 py-2 text-warning-foreground">
        <Callout.Text className="text-xs font-medium">
          <span className="font-bold">Store your passkeys securely.</span> Losing your passkey means losing access to
          your account and any associated funds permanently.
        </Callout.Text>
      </Callout.Root>
    </div>
  )
}

