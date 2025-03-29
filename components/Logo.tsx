"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

import { Navigation } from "@src/constants/routes"
import { FeatureFlagsContext } from "@src/providers/FeatureFlagsProvider"
import { useContext } from "react"

const Logo = () => {
  const { whitelabelTemplate } = useContext(FeatureFlagsContext)

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  if (whitelabelTemplate === "solswap") {
    return (
      <Link href={Navigation.HOME}>
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/static/templates/solswap/logo.svg"
            alt="Solswap Logo"
            width={100}
            height={32}
            className="hidden dark:block"
          />
          <Image
            src="/static/templates/solswap/logo.svg"
            alt="Solswap Logo"
            width={100}
            height={32}
            className="dark:hidden"
          />
        </motion.div>
      </Link>
    )
  }

  if (whitelabelTemplate === "turboswap") {
    return (
      <Link href={Navigation.HOME}>
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/static/templates/turboswap/logo.svg"
            alt="Turboswap Logo"
            width={120}
            height={32}
            className="hidden dark:block"
          />
          <Image
            src="/static/templates/turboswap/logo.svg"
            alt="Turboswap Logo"
            width={120}
            height={32}
            className="dark:hidden"
          />
        </motion.div>
      </Link>
    )
  }

  if (whitelabelTemplate === "dogecoinswap") {
    return (
      <Link href={Navigation.HOME}>
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/static/templates/dogecoinswap/logo.svg"
            alt="Dogecoinswap Logo"
            width={118}
            height={32}
            className="hidden dark:block"
          />
          <Image
            src="/static/templates/dogecoinswap/logo.svg"
            alt="Dogecoinswap Logo"
            width={118}
            height={32}
            className="dark:hidden"
          />
        </motion.div>
      </Link>
    )
  }

  if (whitelabelTemplate === "trumpswap") {
    return (
      <Link href={Navigation.HOME}>
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/static/templates/trumpswap/logo.svg"
            alt="TrumpSwap Logo"
            width={126}
            height={32}
            className="hidden dark:block"
          />
          <Image
            src="/static/templates/trumpswap/logo.svg"
            alt="TrumpSwap Logo"
            width={126}
            height={32}
            className="dark:hidden"
          />
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={Navigation.HOME}>
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/static/templates/near-intents/logo.svg"
          alt="Near Intent Logo"
          width={125}
          height={32}
          className="hidden dark:block"
        />
        <Image
          src="/static/templates/near-intents/logo.svg"
          alt="Near Intent Logo"
          width={125}
          height={32}
          className="dark:hidden"
        />
      </motion.div>
    </Link>
  )
}

export default Logo

