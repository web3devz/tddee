"use client"

import { Text } from "@radix-ui/themes"
import { motion } from "framer-motion"

import CardJob from "@src/app/jobs/Card/CardJob"
import { jobsData } from "@src/app/jobs/mocks"

export default function Jobs() {
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
      className="w-full mx-auto mt-[24px] md:mt-[64px] grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-6 auto-rows-max"
    >
      <motion.div variants={itemVariants} className="my-auto flex flex-col">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Work with us
        </h1>
        <Text size="4">
          We&apos;re growing fast and continuously looking for talented and passionate people to join our team. Please
          have a look at our open positions.
        </Text>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-2 gap-6">
        {jobsData.map((job, i) => (
          <motion.div key={i} variants={itemVariants} custom={i}>
            <CardJob {...job} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

