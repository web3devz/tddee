"use client"

import { WithdrawWidget } from "@defuse-protocol/defuse-sdk"
import { motion } from "framer-motion"

import Paper from "@src/components/Paper"
import { LIST_TOKENS } from "@src/constants/tokens"
import { useConnectWallet } from "@src/hooks/useConnectWallet"
import { useIntentsReferral } from "@src/hooks/useIntentsReferral"
import { useNearWalletActions } from "@src/hooks/useNearWalletActions"
import { useTokenList } from "@src/hooks/useTokenList"
import { useWalletAgnosticSignMessage } from "@src/hooks/useWalletAgnosticSignMessage"

export default function Withdraw() {
  const { state } = useConnectWallet()
  const signMessage = useWalletAgnosticSignMessage()
  const { signAndSendTransactions } = useNearWalletActions()
  const tokenList = useTokenList(LIST_TOKENS)
  const referral = useIntentsReferral()

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
        <WithdrawWidget
          tokenList={tokenList}
          userAddress={state.isVerified ? state.address : undefined}
          chainType={state.chainType}
          sendNearTransaction={async (tx) => {
            const result = await signAndSendTransactions({ transactions: [tx] })

            if (typeof result === "string") {
              return { txHash: result }
            }

            const outcome = result[0]
            if (!outcome) {
              throw new Error("No outcome")
            }

            return { txHash: outcome.transaction.hash }
          }}
          signMessage={(params) => signMessage(params)}
          referral={referral}
        />
      </Paper>
    </motion.div>
  )
}

