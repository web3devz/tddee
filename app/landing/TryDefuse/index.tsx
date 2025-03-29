"use client"

import { Button } from "@radix-ui/themes"
import { motion } from "framer-motion"

import { settings } from "@src/config/settings"
import { APP_URL } from "@src/utils/environment"

const TryDefuse = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full mx-auto flex flex-col items-center gap-6 pt-10 md:pt-0 z-10 my-[72px] md:mt-[148px] md:mb-[156px]"
    >
      <motion.h1
        variants={itemVariants}
        className="text-3xl md:text-6xl text-center font-bold md:text-nowrap bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
      >
        Welcome to {settings.appName}
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="max-w-[561px] text-center text-xl md:text-[40px] font-black md:leading-[48px] tracking-[-0.4px] text-gray-600"
      >
        Multichain DeFi Hub
      </motion.p>
      <motion.div variants={itemVariants}>
        <Button
          onClick={() => window.open(APP_URL)}
          size="4"
          variant="solid"
          color="orange"
          className="cursor-pointer shadow-md hover:shadow-glow transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Try now
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default TryDefuse

