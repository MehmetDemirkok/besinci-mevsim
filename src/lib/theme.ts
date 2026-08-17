export const themeStorageKey = "besinci-mevsim-theme";

export type ThemeMode = "light" | "dark" | "auto";
export type ResolvedTheme = "light" | "dark";

export const DAY_START_HOUR = 7;
export const DAY_END_HOUR = 19;

export const themeColors = {
  light: "#eef3f4",
  dark: "#071014",
} as const;

export function isThemeMode(value: string): value is ThemeMode {
  return value === "light" || value === "dark" || value === "auto";
}

export function resolveTheme(
  mode: ThemeMode,
  hour = new Date().getHours(),
): ResolvedTheme {
  if (mode !== "auto") return mode;
  return hour >= DAY_START_HOUR && hour < DAY_END_HOUR ? "light" : "dark";
}

export function applyResolvedTheme(mode: ThemeMode, resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.themeMode = mode;
  root.style.colorScheme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColors[resolved]);
}

export function persistThemeMode(mode: ThemeMode) {
  try {
    window.localStorage.setItem(themeStorageKey, mode);
  } catch {
    // ignore quota / private mode
  }
  document.cookie = `${themeStorageKey}=${mode}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export const themeInitScript = `(function(){var k=${JSON.stringify(themeStorageKey)};var m="auto";try{var c=document.cookie.split("; ");for(var i=0;i<c.length;i++){if(c[i].indexOf(k+"=" )===0){m=decodeURIComponent(c[i].slice(k.length+1));break;}}var ls=localStorage.getItem(k);if(ls==="light"||ls==="dark"||ls==="auto")m=ls;}catch(e){}if(m!=="light"&&m!=="dark"&&m!=="auto")m="auto";var r=m;if(m==="auto"){var h=new Date().getHours();r=(h>=${DAY_START_HOUR}&&h<${DAY_END_HOUR})?"light":"dark";}var el=document.documentElement;el.setAttribute("data-theme",r);el.setAttribute("data-theme-mode",m);el.style.colorScheme=r;})();`;
