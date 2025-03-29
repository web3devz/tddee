"use client"

import { AccountWidget } from "@defuse-protocol/defuse-sdk"
import { motion } from "framer-motion"

import Paper from "@src/components/Paper"
import { LIST_TOKENS } from "@src/constants/tokens"
import { useConnectWallet } from "@src/hooks/useConnectWallet"
import { useTokenList } from "@src/hooks/useTokenList"
import { renderAppLink } from "@src/utils/renderAppLink"

export default function AccountPage() {
  const { state } = useConnectWallet()
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
        <AccountWidget
          tokenList={tokenList}
          userAddress={(state.isVerified ? state.address : undefined) ?? null}
          userChainType={state.chainType ?? null}
          renderHostAppLink={renderAppLink}
        />
      </Paper>
    </motion.div>
  )
}

