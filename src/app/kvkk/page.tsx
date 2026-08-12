import type { Metadata } from "next";
import { KvkkContent } from "@/components/legal/KvkkContent";
import { getDictionary } from "@/i18n";

const tr = getDictionary("tr");

export const metadata: Metadata = {
  title: tr.legal.kvkkTitle,
  description: tr.legal.kvkkIntro,
};

export default function KvkkPage() {
  return <KvkkContent />;
}
