"use client"

import { DepositWidget } from "@defuse-protocol/defuse-sdk"
import { motion } from "framer-motion"

import Paper from "@src/components/Paper"
import { LIST_TOKENS } from "@src/constants/tokens"
import { ChainType, useConnectWallet } from "@src/hooks/useConnectWallet"
import { useTokenList } from "@src/hooks/useTokenList"

export default function Deposit() {
  const { state, sendTransaction } = useConnectWallet()
  const tokenList = useTokenList(LIST_TOKENS)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Paper>
        <DepositWidget
          tokenList={tokenList}
          userAddress={state.isVerified ? state.address : undefined}
          chainType={state.chainType}
          sendTransactionNear={async (tx) => {
            const result = await sendTransaction({
              id: ChainType.Near,
              tx,
            })
            return Array.isArray(result) ? result[0].transaction.hash : result
          }}
          sendTransactionEVM={async ({ from, ...tx }) => {
            const result = await sendTransaction({
              id: ChainType.EVM,
              tx: {
                ...tx,
                account: from,
              },
            })
            return Array.isArray(result) ? result[0].transaction.hash : result
          }}
          sendTransactionSolana={async (tx) => {
            const result = await sendTransaction({
              id: ChainType.Solana,
              tx,
            })
            return Array.isArray(result) ? result[0].transaction.hash : result
          }}
        />
      </Paper>
    </motion.div>
  )
}

