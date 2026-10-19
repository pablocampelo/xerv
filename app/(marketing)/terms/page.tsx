import { publicMetadata } from "@/config/metadata";
import { Legal } from "@/components/marketing/legal";
import { getSiteConfig } from "@/config/site";
export const metadata = publicMetadata("Terms of service", "Terms template to adapt for your product.", "/terms");
export default function Page(){return <Legal kind="terms" supportEmail={getSiteConfig().supportEmail}/>;}
