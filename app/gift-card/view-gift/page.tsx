"use client"

import { GiftTakerWidget } from "@defuse-protocol/defuse-sdk"
import Paper from "@src/components/Paper"
import { LIST_TOKENS } from "@src/constants/tokens"
import { useConnectWallet } from "@src/hooks/useConnectWallet"
import { useTokenList } from "@src/hooks/useTokenList"
import { useGiftCard } from "../_utils/link"

export default function ViewGiftPage() {
  const { state } = useConnectWallet()
  const tokenList = useTokenList(LIST_TOKENS)
  const secretKey = useGiftCard()

  return (
    <Paper>
      <GiftTakerWidget
        secretKey={secretKey}
        tokenList={tokenList}
        userAddress={state.isVerified ? state.address : undefined}
        userChainType={state.chainType}
      />
    </Paper>
  )
}

