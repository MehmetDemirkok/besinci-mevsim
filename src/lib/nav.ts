export function resolveNavHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}

export function homeHref(pathname: string) {
  return pathname === "/" ? "#main" : "/";
}
