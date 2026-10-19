# Contributing

Keep changes focused on the supported starter: Next.js, Supabase Auth/Postgres/RLS, Stripe subscriptions and Vercel.

Complete [local setup](../docs/SETUP.md#1-local-development), then run these checks before requesting review. **The database reset deletes local data; never target a hosted database.**

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm supabase:db:reset
pnpm supabase:test:db
pnpm supabase:types
pnpm exec playwright install chromium
pnpm test:e2e
```

Generated database types should remain unchanged unless the schema changed. Browser tests use a non-production presentation bypass; hosted provider flows require the [release checklist](../docs/RELEASE-CHECKLIST.md).

Preserve the Auth, ownership, RLS and billing trust boundaries. Do not commit secrets or customer data. Update [Setup](../docs/SETUP.md), [Architecture](../docs/ARCHITECTURE.md) or [Billing](../docs/BILLING.md) only when the supported path changes.
