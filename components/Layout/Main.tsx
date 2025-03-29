"use client"

import { motion } from "framer-motion"
import type { PropsWithChildren } from "react"

interface MainProps extends PropsWithChildren {
  isFullWidth: boolean
}

const Main = ({ children, isFullWidth }: MainProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  if (isFullWidth) {
    return (
      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="w-full">
        {children}
      </motion.main>
    )
  }

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container py-6 md:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-[800px]">{children}</div>
    </motion.main>
  )
}

export default Main

