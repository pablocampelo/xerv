import Link from "next/link";
import { Pricing } from "@/components/marketing/pricing";
import { productConfig } from "@/config/product";
import { Button } from "@/components/ui/button";
import type { PricingViewModel } from "@/lib/ui/models";

const faqs = [
  ["Is Xerv free and open source?", "Yes. Use, fork and adapt Xerv under the MIT license. Hosting, payments and email use your own provider accounts."],
  ["What's included?", "Authentication, private user data, Free and Pro subscriptions, account settings, billing and a responsive interface. The example app shows how they work together."],
  ["Which sign-in methods are supported?", "Google and email/password, with email verification and password recovery."],
  ["How do subscriptions work?", "Stripe Checkout and Customer Portal support monthly and annual Pro plans. Access updates after the server confirms payment."],
  ["Can I build my own product on it?", "Yes. Change the brand and replace the example with your product. Xerv is designed for individual accounts with one Pro plan; team accounts are not included."],
  ["How do I get started?", "Clone the repository and follow the setup guide. Run locally with Docker, then configure your providers and deploy to Vercel."],
] as const;

export function Landing({ pricing }: { pricing: PricingViewModel }) {
  return (
    <>
      <section className="site-container flex min-h-[72svh] flex-col justify-center py-24 sm:min-h-[76svh] sm:py-32 lg:py-40">
        <div className="w-full min-w-0 max-w-[1000px]">
          <h1 className="font-heading break-words text-[clamp(36px,7.4vw,96px)] font-medium leading-[1.015] tracking-[-.045em]">
            <span className="block text-foreground">Build the product.</span>
            <span className="mt-2 block text-muted-foreground sm:mt-3">Not the infrastructure.</span>
          </h1>
          <div className="mt-9 flex max-w-[680px] flex-col items-start gap-8 sm:mt-12 sm:gap-10">
            <p className="max-w-[600px] text-base leading-8 text-secondary-foreground sm:text-lg sm:leading-8">
              The open-source Next.js foundation for authentication, private data, subscriptions, email and deployment.
              Clone Xerv, add your brand and build what makes your product different.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-w-40">
                <Link href={productConfig.repositoryUrl}>View on GitHub</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/signup">Explore the app</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Pricing pricing={pricing} />

      <section id="faq" className="section-space border-t border-white/10">
        <div className="site-container grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-heading mt-4">
              Know what you’re
              <br />
              starting from.
            </h2>
            <p className="section-copy mt-5">
              A focused foundation is easier to understand, adapt, and trust.
            </p>
          </div>
          <div className="space-y-1">
            {faqs.map(([question, answer], index) => (
              <details className="faq-item py-5" key={question}>
                <summary className="flex cursor-pointer list-none items-center gap-3 text-sm font-medium">
                  <span className="mr-1 text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{question}</span>
                  <span
                    aria-hidden="true"
                    className="faq-plus flex size-7 shrink-0 items-center justify-center rounded-full border text-lg font-normal"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 pl-9 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
