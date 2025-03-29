"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"
import { X } from "lucide-react"

import Logo from "@src/components/Logo"
import { LINKS_HEADER, type NavigationLinks } from "@src/constants/routes"
import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const pathname = usePathname()
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 border-r border-border bg-card">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Logo />
        </div>
        <nav className="p-4 space-y-2">
          {LINKS_HEADER.map((link, i) => (
            <SidebarLink key={i} link={link} active={pathname === link.href} />
          ))}
        </nav>
        <div className="absolute bottom-8 left-0 w-full px-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium text-sm mb-2">Need help?</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Check our documentation or contact support for assistance.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden fixed top-0 left-0 z-50 h-full w-3/4 max-w-xs bg-card shadow-xl"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-border">
              <Logo />
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {LINKS_HEADER.map((link, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <SidebarLink link={link} active={pathname === link.href} />
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const SidebarLink = ({ link, active }: { link: NavigationLinks; active: boolean }) => {
  return (
    <Link
      href={link.href}
      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    >
      {link.label}
      {link.comingSoon && (
        <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded-full bg-muted-foreground/20">Soon</span>
      )}
    </Link>
  )
}

export default Sidebar

