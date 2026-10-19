# Xerv

**Build the product. Not the infrastructure.**

An open-source SaaS foundation with authentication, private data and subscriptions already connected. Built with **Next.js, Supabase and Stripe**, with Resend SMTP and Vercel deployment.

[Live demo](https://xerv.vercel.app) · [Get started](docs/SETUP.md) · [MIT license](LICENSE)

[![CI](https://github.com/pablocampelo/xerv/actions/workflows/ci.yml/badge.svg)](https://github.com/pablocampelo/xerv/actions/workflows/ci.yml)

[![Xerv — Build the product. Not the infrastructure.](https://xerv.vercel.app/opengraph-image)](https://xerv.vercel.app)

## What's included

- **Authentication** — email/password, Google sign-in, verification and recovery.
- **Subscriptions** — Free and Pro, monthly or annual billing, Checkout and Customer Portal.
- **Your app** — responsive landing page, dashboard, account settings and a replaceable example with private user data.
- **Tests** — unit, database security and browser tests, run in CI.

Designed for individual accounts and a single Pro plan. Use the foundation, replace the example and build your product.

## Get started

Requires **Node.js 24**, **pnpm 11.19.0** and **Docker**.

```sh
git clone https://github.com/pablocampelo/xerv.git my-saas
cd my-saas
pnpm install --frozen-lockfile
```

Follow the [local setup guide](docs/SETUP.md#1-local-development) to configure the environment and start the app. For deployment, connect your own provider accounts and follow the [release checklist](docs/RELEASE-CHECKLIST.md).

## Make it yours

Set your brand in [`config/product.ts`](config/product.ts), replace the sample pages and build your domain in place of Example.

[Architecture](docs/ARCHITECTURE.md) · [Billing](docs/BILLING.md) · [Contributing](.github/CONTRIBUTING.md)
