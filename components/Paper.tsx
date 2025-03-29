"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { type PropsWithChildren, useContext } from "react"

import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import AuroraLogo from "../../public/static/logos/blockchain-strips/aurora.svg"
import NearLogo from "../../public/static/logos/blockchain-strips/near.svg"
import TurboLogoFrog from "../../public/static/templates/turboswap/logotype-frog.svg"
import { Card } from "@/components/ui/card"

export default function Paper({ children }: PropsWithChildren) {
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)

  const paperVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  }

  if (whitelabelTemplate === "turboswap") {
    return (
      <div className="w-full">
        <motion.div variants={paperVariants} initial="hidden" animate="visible">
          <Card className="glass-effect shadow-lg p-6 w-full">{children}</Card>

          <div className="w-full flex justify-center md:justify-start items-center pt-7">
            <Link
              href="https://auroralabs.dev"
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center gap-1.5 text-sm font-medium bg-white dark:bg-black px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="text-secondary">Built by</span>
              <AuroraLogo className="text-black dark:text-white" />
              <span className="text-secondary">with love for</span>
              <span className="text-black dark:text-white text-nowrap flex items-center gap-1">
                <TurboLogoFrog width={26} height={26} /> Turbo
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (whitelabelTemplate === "trumpswap") {
    return (
      <div className="w-full">
        <motion.div variants={paperVariants} initial="hidden" animate="visible">
          <Card className="glass-effect shadow-lg p-6 w-full">{children}</Card>

          <div className="w-full flex justify-center md:justify-start items-center pt-7">
            <div className="flex justify-center items-center gap-1.5 text-sm font-medium bg-white dark:bg-black px-3 py-1.5 rounded-full shadow-md">
              <span className="text-secondary">Built by</span>
              <NearLogo className="text-black dark:text-white" />
              <span className="text-secondary">with love for</span>
              <span className="text-black dark:text-white">Mr. President</span>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <motion.div variants={paperVariants} initial="hidden" animate="visible">
        <Card className="glass-effect shadow-lg p-6 w-full">{children}</Card>
      </motion.div>
    </div>
  )
}

