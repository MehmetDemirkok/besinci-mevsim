"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ThemeMode } from "@/lib/theme";

const icons: Record<ThemeMode, typeof Sun> = {
  auto: SunMoon,
  light: Sun,
  dark: Moon,
};

export function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { mode, cycleMode } = useTheme();
  const { t } = useLanguage();
  const Icon = icons[mode];
  const label =
    mode === "auto"
      ? t.nav.themeAuto
      : mode === "light"
        ? t.nav.themeLight
        : t.nav.themeDark;

  return (
    <button
      type="button"
      onClick={cycleMode}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-cyan ${className}`}
      aria-label={`${t.nav.theme}: ${label}`}
      title={label}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
}
