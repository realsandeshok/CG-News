"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Navbar() {
  const { setTheme } = useTheme()
  const [activeLink, setActiveLink] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)
    setTheme(newTheme)
  }

  return (
    <header className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="overflow-x-auto pb-2 -mb-2 flex-grow">
        {/* <nav className="flex items-center space-x-6 min-w-max">
          <Link
            href="/"
            className={
              activeLink === "home"
                ? "text-[#ff6b5b] font-medium"
                : "text-foreground font-medium hover:text-[#ff6b5b] transition-colors"
            }
            onClick={() => setActiveLink("home")}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={
              activeLink === "about"
                ? "text-[#ff6b5b] font-medium"
                : "text-foreground font-medium hover:text-[#ff6b5b] transition-colors"
            }
            onClick={() => setActiveLink("about")}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={
              activeLink === "contact"
                ? "text-[#ff6b5b] font-medium"
                : "text-foreground font-medium hover:text-[#ff6b5b] transition-colors"
            }
            onClick={() => setActiveLink("contact")}
          >
            Contact
          </Link>
        </nav> */}
        <div>
          <h1 className="font-bold text-xl">World News</h1>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-4 flex-shrink-0">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}

