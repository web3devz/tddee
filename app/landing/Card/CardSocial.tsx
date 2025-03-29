"use client"

import { Text } from "@radix-ui/themes"
import Image from "next/image"
import { motion } from "framer-motion"

type Props = {
  name: string
  icon: string
  link: string
}
const CardSocial = ({ name, icon, link }: Props) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        window.open(link)
      }}
      className="relative p-4 ld:p-8 shadow-card-multi bg-white rounded-2xl min-w-full lg:min-w-[335px] cursor-pointer transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-center lg:items-start lg:flex-col gap-4">
        <Image
          src={icon || "/placeholder.svg"}
          width={48}
          height={48}
          alt="Social Icon"
          className="rounded-full shadow-sm"
        />
        <Text className="text-base md:text-xl font-bold">{name}</Text>
      </div>
      <div className="absolute inset-y-1/2 -translate-y-[12px] lg:translate-y-0 lg:top-5 right-5">
        <Image src="/static/icons/arrow-top-right.svg" width={24} height={24} alt="Link Icon" />
      </div>
    </motion.div>
  )
}

export default CardSocial

