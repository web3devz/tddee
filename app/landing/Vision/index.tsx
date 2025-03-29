"use client"

import { Button, Text } from "@radix-ui/themes"
import { motion } from "framer-motion"

import CardVision from "@src/app/landing/Card/CardVision"
import Section from "@src/app/landing/Section"
import { settings } from "@src/config/settings"
import { NEXT_PUBLIC_PUBLIC_MAIL } from "@src/utils/environment"

const Vision = () => {
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

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <Section title="Our vision">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-center text-[20px] md:text-[32px] font-black text-gray-600 mb-4 md:mb-5"
        >
          <Text as="span">{settings.appName} is the first platform that&nbsp;</Text>
          <Text as="span" className="text-primary">
            bridges the gap between centralized and decentralized exchanges
          </Text>
          <Text as="span">, creating a seamless, scalable, and secure multi-chain DeFi ecosystem.</Text>
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-center text-[20px] md:text-[32px] font-black text-gray-600 mb-[40px] md:mb-[56px]"
        >
          <Text as="span">
            With {settings.appName}, you can create, trade, and innovate without limitations, enjoying unified
            liquidity.
          </Text>
        </motion.p>
        <div className="w-full flex flex-col gap-[20px] md:gap-[32px]">
          <motion.div variants={cardVariants} custom={0}>
            <CardVision
              title="AccountFi"
              description="Trade, stake, and manage a wide range of assets, including NFTs, FTs, SBTs, and more, across multiple chains without moving funds from their native chains."
              background="bg-card-vision-account-fi--mobile md:bg-card-vision-account-fi bg-cover md:bg-contain bg-top md:bg-center"
            />
          </motion.div>
          <motion.div variants={cardVariants} custom={1}>
            <CardVision
              title={
                <p>
                  Decentralized and
                  <br />
                  Multi-Chain
                </p>
              }
              description={`${settings.appName} is built on a decentralized, multi-chain infrastructure with sharded contracts, supporting any load and unifying liquidity across the crypto ecosystem. It's fully non-custodial and it eliminates the need for bridges.`}
              isReverse
              background="bg-card-vision-multi-cover--mobile md:bg-card-vision-multi-cover bg-cover md:bg-fit lg:-my-5 lg:h-[calc(100%+40px)]"
              cover="/static/images/group-account-multi.svg"
            />
          </motion.div>
          <motion.div variants={cardVariants} custom={2}>
            <CardVision
              title={<span className="text-nowrap">Bringing Everyone Together</span>}
              background="bg-card-vision-bringing--mobile md:bg-card-vision-bringing bg-bottom md:bg-center"
              description={
                <div className="flex flex-col gap-4 md:w-[calc(100%+220px)] lg:w-[calc(100%+180px)]">
                  <p>
                    {settings.appName} fosters collaboration among protocol developers, distribution channels,
                    Solvers/MMs, ecosystems, and token founders. It promotes transparency, simplifies relationships, and
                    encourages active contributions from all market participants.
                  </p>
                  <div className="w-[170px] mx-auto md:mx-0">
                    <Button
                      variant="solid"
                      color="orange"
                      size="4"
                      className="w-full cursor-pointer shadow-md hover:shadow-glow transition-all duration-300 transform hover:scale-105 active:scale-95"
                      onClick={() => window.open(`mailto:${NEXT_PUBLIC_PUBLIC_MAIL}`)}
                    >
                      <Text size="4" weight="medium">
                        Contact us
                      </Text>
                    </Button>
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}

export default Vision

