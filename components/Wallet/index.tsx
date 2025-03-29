"use client"

import { Button, Popover, Text } from "@radix-ui/themes"
import { motion } from "framer-motion"
import Image from "next/image"
import { useContext } from "react"
import type { Connector } from "wagmi"

import WalletConnections from "@src/components/Wallet/WalletConnections"
import { isSupportedByBrowser } from "@src/features/webauthn/lib/webauthnService"
import { ChainType, useConnectWallet } from "@src/hooks/useConnectWallet"
import useShortAccountId from "@src/hooks/useShortAccountId"
import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import { useSignInWindowOpenState } from "@src/stores/useSignInWindowOpenState"
import { mapStringToEmojis } from "@src/utils/emoji"
import { TURN_OFF_APPS } from "@src/utils/environment"

const ConnectWallet = () => {
  const { isOpen, setIsOpen } = useSignInWindowOpenState()
  const { state, signIn, connectors } = useConnectWallet()
  const { shortAccountId } = useShortAccountId(state.address ?? "")
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)

  const handleNearWalletSelector = () => {
    return signIn({ id: ChainType.Near })
  }

  const handleWalletConnect = (connector: Connector) => {
    return signIn({ id: ChainType.EVM, connector })
  }

  const handleSolanaWalletSelector = () => {
    return signIn({ id: ChainType.Solana })
  }

  const handlePasskey = () => {
    return signIn({ id: ChainType.WebAuthn })
  }

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3,
      },
    },
  }

  const walletOptionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  if (!state.address || TURN_OFF_APPS) {
    return (
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type={"button"}
              variant={"solid"}
              size={"2"}
              radius={"full"}
              disabled={TURN_OFF_APPS}
              className="bg-gradient-primary shadow-md hover:shadow-glow transition-all duration-300"
            >
              <Text weight="bold" wrap="nowrap">
                Sign in
              </Text>
            </Button>
          </motion.div>
        </Popover.Trigger>
        <Popover.Content
          maxWidth={{ initial: "90vw", xs: "480px" }}
          minWidth={{ initial: "300px", xs: "330px" }}
          className="md:mr-[48px] dark:bg-black-800 rounded-2xl shadow-lg p-4 animate-fade-in"
        >
          <Text size="1" className="font-medium mb-4">
            How do you want to sign in?
          </Text>
          <div className="w-full grid grid-cols-1 gap-4">
            <Text size="1" color="gray" className="font-medium">
              Popular options
            </Text>

            {isSupportedByBrowser() && (
              <motion.div variants={walletOptionVariants}>
                <Button
                  onClick={() => handlePasskey()}
                  size="4"
                  radius="medium"
                  variant="soft"
                  color="gray"
                  className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                >
                  <div className="w-full flex items-center justify-start gap-2">
                    <Image
                      src="/static/icons/wallets/webauthn.svg"
                      alt=""
                      width={36}
                      height={36}
                      className="rounded-full shadow-sm"
                    />
                    <Text size="2" weight="bold">
                      Passkey
                    </Text>
                  </div>
                </Button>
              </motion.div>
            )}

            {whitelabelTemplate === "turboswap" ? (
              <>
                {/* WalletConnect */}
                {connectors
                  .filter((c) => c.id === "walletConnect")
                  .map((connector, index) => (
                    <motion.div
                      key={connector.uid}
                      variants={walletOptionVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 * (index + 1) }}
                    >
                      <Button
                        onClick={() => handleWalletConnect(connector)}
                        size="4"
                        radius="medium"
                        variant="soft"
                        color="gray"
                        className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                      >
                        <div className="w-full flex items-center justify-start gap-2">
                          <WalletIcon connector={connector} />
                          <Text size="2" weight="bold">
                            {renderWalletName(connector)}
                          </Text>
                        </div>
                      </Button>
                    </motion.div>
                  ))}

                {/* EIP-6963 detected wallets */}
                {connectors
                  .filter((c) => c.type === "injected" && c.id !== "injected")
                  .map((connector, index) => (
                    <motion.div
                      key={connector.uid}
                      variants={walletOptionVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 * (index + 3) }}
                    >
                      <Button
                        onClick={() => handleWalletConnect(connector)}
                        size="4"
                        radius="medium"
                        variant="soft"
                        color="gray"
                        className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                      >
                        <div className="w-full flex items-center justify-start gap-2">
                          <WalletIcon connector={connector} />
                          <Text size="2" weight="bold">
                            {renderWalletName(connector)}
                          </Text>
                        </div>
                      </Button>
                    </motion.div>
                  ))}

                <Text size="1" color="gray" className="font-medium mt-2">
                  Other options
                </Text>

                <motion.div
                  variants={walletOptionVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={handleNearWalletSelector}
                    size="4"
                    radius="medium"
                    variant="soft"
                    color="gray"
                    className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                  >
                    <div className="w-full flex items-center justify-start gap-2">
                      <Image
                        src="/static/icons/wallets/near-wallet-selector.svg"
                        alt="Near Wallet Selector"
                        width={36}
                        height={36}
                        className="rounded-full shadow-sm"
                      />
                      <Text size="2" weight="bold">
                        NEAR Wallet
                      </Text>
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  variants={walletOptionVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    onClick={handleSolanaWalletSelector}
                    size="4"
                    radius="medium"
                    variant="soft"
                    color="gray"
                    className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                  >
                    <div className="w-full flex items-center justify-start gap-2">
                      <Image
                        src="/static/icons/wallets/solana-logo-mark.svg"
                        alt="Solana Wallet Selector"
                        width={36}
                        height={36}
                        className="rounded-full shadow-sm"
                      />
                      <Text size="2" weight="bold">
                        Solana Wallet
                      </Text>
                    </div>
                  </Button>
                </motion.div>

                {/* Other non-EIP-6963 connectors */}
                {connectors
                  .filter((c) => c.id !== "walletConnect" && c.type !== "injected")
                  .map((connector, index) => (
                    <motion.div
                      key={connector.uid}
                      variants={walletOptionVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 * (index + 8) }}
                    >
                      <Button
                        onClick={() => handleWalletConnect(connector)}
                        size="4"
                        radius="medium"
                        variant="soft"
                        color="gray"
                        className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                      >
                        <div className="w-full flex items-center justify-start gap-2">
                          <WalletIcon connector={connector} />
                          <Text size="2" weight="bold">
                            {renderWalletName(connector)}
                          </Text>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
              </>
            ) : (
              // Original order for other templates
              <>
                <motion.div
                  variants={walletOptionVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                >
                  <Button
                    onClick={handleSolanaWalletSelector}
                    size="4"
                    radius="medium"
                    variant="soft"
                    color="gray"
                    className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                  >
                    <div className="w-full flex items-center justify-start gap-2">
                      <Image
                        src="/static/icons/wallets/solana-logo-mark.svg"
                        alt="Solana Wallet Selector"
                        width={36}
                        height={36}
                        className="rounded-full shadow-sm"
                      />
                      <Text size="2" weight="bold">
                        Solana Wallet
                      </Text>
                    </div>
                  </Button>
                </motion.div>

                {whitelabelTemplate !== "solswap" && (
                  <>
                    <motion.div
                      variants={walletOptionVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                    >
                      <Button
                        onClick={handleNearWalletSelector}
                        size="4"
                        radius="medium"
                        variant="soft"
                        color="gray"
                        className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                      >
                        <div className="w-full flex items-center justify-start gap-2">
                          <Image
                            src="/static/icons/wallets/near-wallet-selector.svg"
                            alt="Near Wallet Selector"
                            width={36}
                            height={36}
                            className="rounded-full shadow-sm"
                          />
                          <Text size="2" weight="bold">
                            NEAR Wallet
                          </Text>
                        </div>
                      </Button>
                    </motion.div>
                    {connectors.slice(0, 1).map((connector, index) => (
                      <motion.div
                        key={connector.uid}
                        variants={walletOptionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.3 }}
                      >
                        <Button
                          onClick={() => handleWalletConnect(connector)}
                          size="4"
                          radius="medium"
                          variant="soft"
                          color="gray"
                          className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                        >
                          <div className="w-full flex items-center justify-start gap-2">
                            <WalletIcon connector={connector} />
                            <Text size="2" weight="bold">
                              {renderWalletName(connector)}
                            </Text>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                    <Text size="1" color="gray" className="font-medium mt-2">
                      Other options
                    </Text>
                    {connectors
                      .slice(1)
                      .filter((connector) => connector.id !== "injected")
                      .map((connector, index) => (
                        <motion.div
                          key={connector.uid}
                          variants={walletOptionVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <Button
                            onClick={() => handleWalletConnect(connector)}
                            size="4"
                            radius="medium"
                            variant="soft"
                            color="gray"
                            className="px-2.5 w-full hover:bg-secondary/80 transition-all duration-300"
                          >
                            <div className="w-full flex items-center justify-start gap-2">
                              <WalletIcon connector={connector} />
                              <Text size="2" weight="bold">
                                {renderWalletName(connector)}
                              </Text>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                  </>
                )}
              </>
            )}
          </div>
        </Popover.Content>
      </Popover.Root>
    )
  }

  return (
    <div className="flex gap-2">
      <Popover.Root>
        <Popover.Trigger>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type={"button"}
              variant={"soft"}
              color={"gray"}
              size={"2"}
              radius={"full"}
              disabled={TURN_OFF_APPS}
              className="font-bold text-gray-12 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {state.chainType !== "webauthn" ? (
                shortAccountId
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <Image
                      src="/static/icons/wallets/webauthn.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-full size-6 bg-[#000]"
                      style={{
                        mask: "radial-gradient(13px at 31px 50%, transparent 99%, rgb(255, 255, 255) 100%)",
                      }}
                    />
                    <div className="-ml-1 rounded-full size-6 bg-white text-black text-base flex items-center justify-center">
                      {mapStringToEmojis(state.address, { count: 1 }).join("")}
                    </div>
                  </div>

                  <div className="font-bold text-gray-12">passkey</div>
                </div>
              )}
            </Button>
          </motion.div>
        </Popover.Trigger>
        <Popover.Content
          minWidth={{ initial: "300px", xs: "330px" }}
          className="mt-1 md:mr-[48px] max-w-xs dark:bg-black-800 rounded-2xl shadow-lg p-4 animate-fade-in"
        >
          <div className="flex flex-col gap-5">
            <WalletConnections />
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}

function WalletIcon({ connector }: { connector: Connector }) {
  switch (connector.id) {
    case "walletConnect":
      return (
        <Image
          src="/static/icons/wallets/wallet-connect.svg"
          alt="Wallet Connect"
          width={36}
          height={36}
          className="rounded-full shadow-sm"
        />
      )
    case "coinbaseWalletSDK":
      return (
        <Image
          src="/static/icons/wallets/coinbase-wallet.svg"
          alt="Coinbase Wallet"
          width={36}
          height={36}
          className="rounded-full shadow-sm"
        />
      )
    case "metaMaskSDK":
      return (
        <Image
          src="/static/icons/wallets/meta-mask.svg"
          alt="MetaMask"
          width={36}
          height={36}
          className="rounded-full shadow-sm"
        />
      )
  }

  if (connector.icon != null) {
    return (
      <Image
        src={connector.icon.trim() || "/placeholder.svg"}
        alt={connector.name}
        width={36}
        height={36}
        className="rounded-full shadow-sm"
      />
    )
  }
}

function renderWalletName(connector: Connector) {
  return connector.name
}

export default ConnectWallet

