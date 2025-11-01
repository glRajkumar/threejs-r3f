"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeTogglerProps = {
  className?: string
}

function ThemeToggler({ className }: ThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme()

  const switchTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const toggleTheme = () => {
    //@ts-ignore
    if (!document.startViewTransition) switchTheme()

    //@ts-ignore
    document.startViewTransition(switchTheme)
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className={cn("size-7 aspect-square p-0 cursor-pointer", className)}
    >
      <SunIcon className={cn("size-4 hidden dark:block")} />
      <MoonIcon className={cn("size-4 dark:hidden")} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggler
