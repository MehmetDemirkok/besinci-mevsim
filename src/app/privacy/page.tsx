import type { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/PrivacyContent";
import { getDictionary } from "@/i18n";

const tr = getDictionary("tr");

export const metadata: Metadata = {
  title: tr.legal.privacyTitle,
  description: tr.legal.privacyIntro,
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
