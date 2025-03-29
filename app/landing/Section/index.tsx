"use client"

import { motion } from "framer-motion"
import clsx from "clsx"
import type { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  title: string
  className?: string
}

const Section = ({ title, className = "", children }: Props) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
      },
    },
  }

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col items-center pt-[64px] md:pt-[74px] pb-[42px] md:pb-[54px]"
    >
      <motion.h2
        variants={titleVariants}
        className="font-black mb-5 text-black-400 text-[32px] md:text-5xl text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>
      <div className={clsx("w-full", className && className)}>{children}</div>
    </motion.section>
  )
}

export default Section

