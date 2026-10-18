import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HelpContent({ supportEmail }: { supportEmail: string }) {
  return <div className="space-y-10"><section className="rounded-lg border p-6 sm:p-8"><Mail className="mb-5 size-5 text-muted-foreground" aria-hidden="true"/><h2 className="text-2xl">A human way to get unstuck.</h2><p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">Contact us for help with your account or billing. You don’t need to sign in.</p><Button asChild className="mt-5"><a href={`mailto:${supportEmail}`}>Contact support<ArrowUpRight aria-hidden="true"/></a></Button><p className="mt-3 break-all text-xs text-muted-foreground">{supportEmail}</p></section><section><h2 className="mb-5 text-2xl">Before you reach out</h2><div className="divide-y border-y">{[
    ["Can’t access your account?", "Use password recovery from Sign in. If your verification or recovery link has expired, request a new one."],
    ["Need to change your email or delete your account?", "Contact support for help with these requests."],
    ["A payment is still confirming?", "Check your payment status in Billing. If it remains unresolved, contact support."],
    ["What should I include?", "Describe the issue and include any support reference shown on screen. Never send passwords, card details or access tokens."],
  ].map(([title, text]) => <details key={title} className="group py-4"><summary className="cursor-pointer text-sm font-medium">{title}</summary><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{text}</p></details>)}</div></section></div>;
}
