"use client"

import { type Adapter, WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter, WalletConnectWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { type FC, type ReactNode, useMemo } from "react"

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css"
import { PROJECT_ID, SOLANA_RPC_URL } from "@src/utils/environment"

export const SolanaWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => SOLANA_RPC_URL || clusterApiUrl(network), [network])

  const wallets = useMemo(() => {
    /**
     * Wallets that implement either of these standards will be available automatically.
     *
     *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
     *     (https://github.com/solana-mobile/mobile-wallet-adapter)
     *   - Solana Wallet Standard
     *     (https://github.com/anza-xyz/wallet-standard)
     *
     * If you wish to support a wallet that supports neither of those standards,
     * instantiate its legacy wallet adapter here. Common legacy adapters can be found
     * in the npm package `@solana/wallet-adapter-wallets`.
     */
    const walletAdapters: Adapter[] = [new PhantomWalletAdapter(), new SolflareWalletAdapter()]

    if (PROJECT_ID) {
      walletAdapters.push(
        new WalletConnectWalletAdapter({
          network,
          options: {
            projectId: PROJECT_ID,
          },
        }),
      )
    }

    return walletAdapters
  }, [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

