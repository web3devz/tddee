"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion"
import { Text } from "@radix-ui/themes"
import clsx from "clsx"
import Image from "next/image"
import { type PropsWithChildren, useState } from "react"
import { motion } from "framer-motion"

import Section from "@src/app/landing/Section"
import { settings } from "@src/config/settings"

const ButtonFAQ = ({ children, isActive }: PropsWithChildren & { isActive: boolean }) => {
  return (
    <div
      className={clsx(
        "h-[74px] md:h-[76px] w-full flex justify-between items-center bg-gray-950 px-6 md:px-8 py-6 rounded-2xl cursor-pointer transition-all duration-300",
        isActive ? "rounded-b-none shadow-md" : "hover:bg-gray-900",
      )}
    >
      <Text
        className={clsx(
          "leading-6 text-base md:text-xl text-black-400 font-bold transition-colors duration-300",
          isActive && "text-primary",
        )}
      >
        {children}
      </Text>
      {isActive ? (
        <Image
          src="/static/icons/minus.svg"
          alt="Minus Icon"
          width={24}
          height={24}
          className="transition-transform duration-300"
        />
      ) : (
        <Image
          src="/static/icons/plus.svg"
          alt="Plus Icon"
          width={24}
          height={24}
          className="transition-transform duration-300"
        />
      )}
    </div>
  )
}

const SectionFAQ = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex justify-between items-center bg-gray-950 px-6 md:px-8 pb-6 rounded-b-2xl">
      <Text size="2" weight="medium" className="text-gray-600">
        {children}
      </Text>
    </div>
  )
}

const FAQ = () => {
  const [expandedSection, setExpandedSection] = useState<string>("1")

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
    <Section title="FAQ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex flex-col gap-4 mt-[40px] mb-[54px] md:mb-[74px] max-w-[512px]"
      >
        <Accordion.Root type="single" defaultValue="1" collapsible onValueChange={(value) => setExpandedSection(value)}>
          <motion.div variants={itemVariants}>
            <Accordion.Item className="AccordionItem" value="1">
              <AccordionTrigger className="w-full">
                <ButtonFAQ isActive={expandedSection === "1"}>What is {settings.appName}?</ButtonFAQ>
              </AccordionTrigger>
              <AccordionContent>
                <SectionFAQ>
                  {settings.appName} is a scalable, multi-chain DeFi infrastructure that facilitates the creation and
                  trading of financial instruments with minimized centralization risks, while unifying liquidity across
                  crypto ecosystems.
                </SectionFAQ>
              </AccordionContent>
            </Accordion.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Accordion.Item className="AccordionItem mt-4" value="2">
              <AccordionTrigger className="w-full">
                <ButtonFAQ isActive={expandedSection === "2"}>How does {settings.appName} work?</ButtonFAQ>
              </AccordionTrigger>
              <AccordionContent>
                <SectionFAQ>
                  {settings.appName} is based on Intent-Based Architecture and AccountFi. Utilizing a chain of
                  abstraction, {settings.appName} allows the trading of assets across different chains. This trading is
                  conducted on an intent-based model, where users interact with active market participants.
                </SectionFAQ>
              </AccordionContent>
            </Accordion.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Accordion.Item className="AccordionItem mt-4" value="3">
              <AccordionTrigger className="w-full">
                <ButtonFAQ isActive={expandedSection === "3"}>What is AccountFi?</ButtonFAQ>
              </AccordionTrigger>
              <AccordionContent>
                <SectionFAQ>
                  AccountFi describes financial operations which are conducted upon accounts rather then individual
                  tokens. This allows for the trading, lending, and management of accounts possessing different assets,
                  such as fungible tokens, NFTs, and non-transferable tokens like Soulbound Tokens (SBTs).
                </SectionFAQ>
              </AccordionContent>
            </Accordion.Item>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Accordion.Item className="AccordionItem mt-4" value="4">
              <AccordionTrigger className="w-full">
                <ButtonFAQ isActive={expandedSection === "4"}>Is {settings.appName} scalable?</ButtonFAQ>
              </AccordionTrigger>
              <AccordionContent>
                <SectionFAQ>
                  {settings.appName} utilizes a sharded contract approach, which scales the protocol depending on its'
                  use. {settings.appName} is powered by the most scalable blockchain to date – NEAR Protocol.
                </SectionFAQ>
              </AccordionContent>
            </Accordion.Item>
          </motion.div>
        </Accordion.Root>
      </motion.div>
    </Section>
  )
}

export default FAQ

