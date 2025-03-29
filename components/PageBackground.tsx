"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useContext } from "react"

import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import solswapBg from "../../public/static/templates/solswap/bg.png"

const PageBackground = () => {
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
  }

  if (whitelabelTemplate === "solswap") {
    return (
      <motion.div variants={backgroundVariants} initial="hidden" animate="visible" className="fixed inset-0 -z-10">
        <Image
          src={solswapBg || "/placeholder.svg"}
          alt={""}
          className="w-full h-full object-cover object-bottom"
          unoptimized
          priority
        />
      </motion.div>
    )
  }

  if (whitelabelTemplate === "turboswap") {
    return (
      <motion.div variants={backgroundVariants} initial="hidden" animate="visible" className="fixed inset-0 -z-10">
        <div className="bg-[linear-gradient(180deg,#F9F9F8_0%,#F9F8E6_81.5%,#F9F8E6_100%)] w-full h-full bg-pattern-dots" />
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-1/2 lg:left-[75%] -translate-x-1/2 w-[620px] h-[620px]">
          <Image
            src="/static/templates/turboswap/coin-frog.png"
            alt=""
            className="object-contain animate-pulse-slow"
            fill
            unoptimized
            priority
          />
        </div>
      </motion.div>
    )
  }

  if (whitelabelTemplate === "dogecoinswap") {
    return (
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:block fixed inset-0 -z-10"
      >
        <div className="w-full h-full bg-no-repeat bg-center bg-cover bg-[url('/static/templates/dogecoinswap/bg-light.jpg')] bg-pattern-grid" />
      </motion.div>
    )
  }

  if (whitelabelTemplate === "trumpswap") {
    return (
      <motion.div variants={backgroundVariants} initial="hidden" animate="visible" className="fixed inset-0 -z-10">
        <div className="w-full h-full bg-no-repeat bg-center bg-cover opacity-15 bg-[url('/static/templates/trumpswap/bg-usa-flag.webp')] bg-pattern-dots" />
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-1/2 lg:left-[70%] -translate-x-1/2 w-[660px] h-[660px]">
          <Image
            src="/static/templates/trumpswap/trump-standing.png"
            alt=""
            className="object-contain animate-pulse-slow"
            fill
            unoptimized
            priority
          />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      className="fixed inset-0 -z-10 bg-gray-50 dark:bg-black-900"
    >
      <div className="w-full h-full bg-no-repeat bg-bottom bg-page-light--mobile md:bg-page-light dark:bg-page-dark--mobile dark:md:bg-page-dark bg-pattern-dots" />
    </motion.div>
  )
}

export default PageBackground

