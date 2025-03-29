"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

import Footer from "@src/components/Layout/Footer"
import Header from "@src/components/Layout/Header"
import NavbarMobile from "@src/components/NavbarMobile"
import PageBackground from "@src/components/PageBackground"
import Sidebar from "@src/components/Layout/Sidebar"
import { WalletVerificationProvider } from "@src/providers/WalletVerificationProvider"
import type React from "react"
import type { PropsWithChildren } from "react"
import Main from "./Main"

type LayoutProps = PropsWithChildren & {
  enableBackground?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, enableBackground = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Determine if the current page should use the full-width layout
  const isFullWidth = ["/landing", "/jobs"].some((path) => pathname?.startsWith(path))

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      {!isFullWidth && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}

      <div className="flex flex-col flex-grow">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isFullWidth={isFullWidth} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex-grow ${isFullWidth ? "w-full" : "px-4 md:px-6 lg:px-8"}`}
        >
          <Main isFullWidth={isFullWidth}>{children}</Main>
        </motion.div>

        <Footer isFullWidth={isFullWidth} />
        <NavbarMobile />
        {enableBackground && <PageBackground />}

        <WalletVerificationProvider />
      </div>
    </div>
  )
}

export default Layout

