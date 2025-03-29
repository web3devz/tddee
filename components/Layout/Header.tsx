"use client"

import { useContext, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"

import AddTurboChainButton from "@src/components/AddTurboChainButton"
import Logo from "@src/components/Logo"
import Navbar from "@src/components/Navbar"
import Settings from "@src/components/Settings"
import ConnectWallet from "@src/components/Wallet"
import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import { Button } from "@/components/ui/button"
import styles from "./Header.module.css"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  isFullWidth: boolean
}

const Header = ({ sidebarOpen, setSidebarOpen, isFullWidth }: HeaderProps) => {
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${styles.header} h-16 sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container h-full flex items-center px-4">
        <div className="flex items-center gap-4">
          {!isFullWidth && (
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}

          {/* Only show logo in header on mobile or when using full width layout */}
          {(isFullWidth || window.innerWidth < 1024) && <Logo />}
        </div>

        {isFullWidth && (
          <div className="hidden md:flex flex-1 justify-center">
            <Navbar />
          </div>
        )}

        <div className="flex items-center gap-4 ml-auto">
          {whitelabelTemplate === "turboswap" && (
            <div className="hidden md:block">
              <AddTurboChainButton />
            </div>
          )}
          <ConnectWallet />
          <Settings />
        </div>
      </div>
    </motion.header>
  )
}

export default Header

