import { get } from "@vercel/edge-config"
import { flag } from "@vercel/flags/next"
import { headers } from "next/headers"

import { domains } from "@src/config/domains"
import { logger } from "@src/utils/logger"

export type WhitelabelTemplateValue = "near-intents" | "solswap" | "dogecoinswap" | "turboswap" | "trumpswap"

export const whitelabelTemplateFlag = flag({
  key: "whitelabelTemplate",
  defaultValue: "near-intents" as WhitelabelTemplateValue,
  options: [
    { label: "near-intents.org", value: "near-intents" },
    { label: "SolSwap.org", value: "solswap" },
    { label: "DogecoinSwap.org", value: "dogecoinswap" },
    { label: "TurboSwap.org", value: "turboswap" },
    { label: "trump-swap.org", value: "trumpswap" },
  ],
  async decide(): Promise<WhitelabelTemplateValue> {
    const headers_ = await headers()
    const host = headers_.get("host")
    if (host != null) {
      if (domains[host]) {
        return domains[host]
      }
    }

    return "near-intents"
  },
})

export const maintenanceModeFlag = flag({
  key: "maintenanceMode",
  defaultValue: false as boolean,
  options: [
    { label: "On", value: true },
    { label: "Off", value: false },
  ],
  async decide() {
    try {
      const isMaintenanceMode = await get("isMaintenanceMode")
      return isMaintenanceMode === true
    } catch (err) {
      logger.error(err)
      return false
    }
  },
})

