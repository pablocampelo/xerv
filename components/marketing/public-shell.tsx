"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { GitHubMark } from "@/components/shared/github-mark";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { productConfig } from "@/config/product";

const footerGroups = [
  {
    title: "Product",
    items: [
      ...productConfig.navigation.public.map(({ label, href }) => [label, href] as const),
      ["Log in", "/login"] as const,
    ],
  },
  {
    title: "Resources",
    items: [["Help", "/help"]],
  },
  {
    title: "Legal",
    items: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
] as const;

export function PublicShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const mobileItems = [
    ...productConfig.navigation.public,
    { label: "Log in", href: "/login" },
    { label: "Get started", href: "/signup" },
  ];

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="border-b border-white/10 bg-background">
        <div className="site-container flex h-16 items-center justify-between gap-4">
          <Brand />
          <nav aria-label="Main navigation" className="hidden items-center lg:flex">
            <div className="flex items-center gap-5 xl:gap-7">
              {productConfig.navigation.public.map((item) => (
                <Link className="nav-link inline-flex min-h-10 min-w-10 items-center justify-center" key={item.href} href={item.href} aria-label={item.label}>
                  {item.href === productConfig.repositoryUrl ? <GitHubMark /> : item.label}
                </Link>
              ))}
            </div>
            <div className="ml-7 flex items-center gap-4 xl:ml-10 xl:gap-6">
              <Link className="nav-link" href="/login">
                Log in
              </Link>
              <Button asChild size="sm">
                <Link href="/signup">Get started</Link>
              </Button>
            </div>
          </nav>
          <Button
            className="lg:hidden"
            variant="outline"
            size="sm"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" />
          </Button>
        </div>
      </header>

      <Dialog drawer open={open} onClose={() => setOpen(false)} title="Navigation">
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {mobileItems.map((item) => (
            <Link
              className="rounded-md p-3 text-sm transition-colors hover:bg-muted"
              key={item.href}
              href={item.href}
              aria-label={item.label}
              onClick={() => setOpen(false)}
            >
              {item.href === productConfig.repositoryUrl ? <GitHubMark /> : item.label}
            </Link>
          ))}
        </nav>
      </Dialog>

      <main id="main">{children}</main>

      <footer className="border-t border-white/10 py-12">
        <div className="site-container grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Brand symbolOnly />
          </div>

          {footerGroups.map((group) => (
            <nav aria-label={group.title} key={group.title}>
              <h2 className="mb-4 font-sans text-sm font-semibold">{group.title}</h2>
              <ul className="space-y-3">
                {group.items.map(([label, href]) => (
                  <li key={href}>
                    <Link className="nav-link" href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </footer>
    </>
  );
}
