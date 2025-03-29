"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

import Navbar from "@src/components/Navbar"
import { LINKS_HEADER, Navigation } from "@src/constants/routes"

const NavbarMobile = () => {
  const pathname = usePathname()
  const isMarketPage = pathname === Navigation.JOBS

  // Don't show mobile navbar on landing pages
  const isLandingPage = pathname?.startsWith("/landing")
  if (isLandingPage) return null

  const navVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <motion.div
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed bottom-0 z-50 left-0 md:hidden w-full px-5 pt-3 pb-[max(env(safe-area-inset-bottom,0px),theme(spacing.3))] bg-background/90 dark:bg-background/90 backdrop-blur-md border-t border-border shadow-lg"
      >
        {!isMarketPage && <Navbar links={[...LINKS_HEADER]} />}
        {isMarketPage && (
          <div className="flex justify-center items-center gap-4">
            <Link
              href={Navigation.JOBS}
              className="relative px-4 py-2 rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-md"
            >
              Jobs
            </Link>
          </div>
        )}
      </motion.div>
      <div className="block md:hidden h-[calc(44px+max(env(safe-area-inset-bottom,0px),theme(spacing.3)))]" />
    </>
  )
}

export default NavbarMobile

