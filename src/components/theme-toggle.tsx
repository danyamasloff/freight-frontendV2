import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className={cn(
          "bg-slate-200 dark:bg-slate-800",
          "transition-colors duration-200"
        )}
      >
        <Sun
          className={cn(
            "h-3 w-3 transition-all duration-200",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 text-yellow-500"
          )}
        />
        <Moon
          className={cn(
            "absolute h-3 w-3 transition-all duration-200",
            isDark
              ? "rotate-0 scale-100 text-slate-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </Switch>
    </div>
  )
}
