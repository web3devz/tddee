"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useContext } from "react"

import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import DogecoinLogo from "../../../public/static/logos/blockchain-strips/dogecoin.svg"
import NearLogo from "../../../public/static/logos/blockchain-strips/near.svg"
import SolanaLogo from "../../../public/static/logos/blockchain-strips/solana.svg"

interface FooterProps {
  isFullWidth: boolean
}

const Footer = ({ isFullWidth }: FooterProps) => {
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Template-specific footers
  if (whitelabelTemplate === "solswap") {
    return (
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full py-6 ${isFullWidth ? "" : "container"}`}
      >
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center text-sm font-medium text-white gap-1.5 bg-black/25 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span>Built by</span>
            <NearLogo />
            <span>with love for</span>
            <SolanaLogo />
          </div>
        </div>
      </motion.footer>
    )
  }

  if (whitelabelTemplate === "turboswap") {
    return (
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        className={`lg:hidden py-6 ${isFullWidth ? "" : "container"}`}
      >
        <Image
          src="/static/templates/turboswap/coin-frog.png"
          alt=""
          width={400}
          height={400}
          className="w-full max-w-[400px] mx-auto animate-pulse-slow"
          priority
        />
      </motion.footer>
    )
  }

  if (whitelabelTemplate === "trumpswap") {
    return (
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        className={`lg:hidden py-6 ${isFullWidth ? "" : "container"}`}
      >
        <Image
          src="/static/templates/trumpswap/trump-standing.png"
          alt=""
          width={400}
          height={400}
          className="w-full max-w-[400px] mx-auto animate-pulse-slow"
          priority
        />
      </motion.footer>
    )
  }

  if (whitelabelTemplate === "dogecoinswap") {
    return (
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        className={`py-6 ${isFullWidth ? "" : "container"}`}
      >
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-1.5 text-sm font-medium bg-white dark:bg-black px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
            <span className="text-secondary">Built by</span>
            <NearLogo className="text-black dark:text-white" />
            <span className="text-secondary">with love for</span>
            <DogecoinLogo className="text-black dark:text-white" />
          </div>
        </div>

        <Image
          src="/static/templates/dogecoinswap/doge-bottom.png"
          alt=""
          loading="lazy"
          width={750}
          height={528}
          className="object-contain md:hidden animate-pulse-slow"
        />
      </motion.footer>
    )
  }

  // Default footer
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className={`py-6 ${isFullWidth ? "" : "container"}`}
    >
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center gap-1.5 text-sm font-medium bg-white dark:bg-black px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
          <span className="text-secondary">Powered by</span>
          <NearLogo className="text-black dark:text-white" />
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer

