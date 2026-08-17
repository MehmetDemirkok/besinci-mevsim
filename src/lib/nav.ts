export function resolveNavHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

export function homeHref(pathname: string) {
  return pathname === "/" ? "#main" : "/";
}

export const visionPath = "/vizyon-misyon";

export function menuHref(
  item: { key: string; href: string },
  pathname: string,
  mode: "nav" | "footer" = "nav",
) {
  if (item.key === "vision") return visionPath;
  if (item.key === "services") {
    return mode === "footer" || pathname !== "/" ? "/hizmetler" : "#services";
  }
  return resolveNavHref(item.href, pathname);
}
