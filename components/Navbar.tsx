"use client"

import { motion } from "framer-motion"
import clsx from "clsx"
import { usePathname } from "next/navigation"

import { LINKS_HEADER, type NavigationLinks } from "@src/constants/routes"
import { TURN_OFF_APPS } from "@src/utils/environment"

import Link from "next/link"
import { LabelComingSoon } from "./ComingSoon"

type Props = {
  links?: NavigationLinks[]
}

const Navbar = ({ links = LINKS_HEADER }: Props) => {
  const pathname = usePathname()

  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center items-center gap-2"
    >
      {links.map((route, i) => {
        const isCurrentPage = route.href === pathname
        return (
          <motion.div key={i} variants={itemVariants}>
            <Link href={route.href}>
              <div
                className={clsx(
                  "relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300",
                  TURN_OFF_APPS || route.comingSoon
                    ? "pointer-events-none text-gray-500"
                    : "cursor-pointer hover:scale-105",
                  isCurrentPage ? "bg-primary text-white shadow-md" : "bg-transparent hover:bg-secondary/50",
                )}
              >
                {route.label}
                {route.comingSoon && !isCurrentPage && <LabelComingSoon />}
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.nav>
  )
}

export default Navbar

