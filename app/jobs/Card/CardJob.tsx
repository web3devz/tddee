"use client"

import { Text } from "@radix-ui/themes"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import type { JobsDetails } from "@src/types/interfaces"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const CardJob = ({ team, position, link, applicationLink }: JobsDetails) => {
  return (
    <Link href={link}>
      <motion.div whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
        <Card className="min-h-[147px] h-full shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="w-full flex justify-between items-center">
              {applicationLink ? (
                <Text
                  size="1"
                  weight="medium"
                  wrap="nowrap"
                  className="w-fit bg-primary rounded-full text-white px-3 py-2 text-sm"
                >
                  Open Application
                </Text>
              ) : (
                <Text as="p" size="3" className="text-muted-foreground">
                  {team}
                </Text>
              )}
              <Image src="/static/icons/arrow-top-right.svg" width={16} height={16} alt="Link Icon" />
            </div>
          </CardHeader>
          <CardContent>
            <Text as="p" size="4" className="font-semibold">
              {position}
            </Text>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

export default CardJob

