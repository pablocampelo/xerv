# Architecture

Xerv is one Next.js App Router application backed by Supabase Auth/Postgres and Stripe. It is designed for **one user owning private product data**, with one optional Pro entitlement. The supported model is individual accounts, Free + Pro, monthly or annual billing, and deployment to Vercel.

## Request and financial flows

```text
Browser ──► Next.js UI / Server Actions ──► Supabase Auth
   │                    │                         │
   │                    └──── user-scoped DB ─────► Postgres + RLS
   │                                               └─ has_pro() from paid_through
   │
   └────► server-created Stripe Checkout / Customer Portal
                                │
                     signed Stripe webhook
                                │
                     verified provider facts
                                │
                     server-only billing projection
```

**No browser redirect, UI flag, cookie value or client-submitted Price ID grants Pro.** The recognized paid period in Postgres is the authorization input, derived from authenticated Stripe financial facts.

## Where things live

| Path | Responsibility |
| --- | --- |
| `app/` | App Router pages, private app layout, OAuth/email callbacks and signed webhook HTTP endpoint |
| `components/auth/`, `lib/auth/` | User journeys, Auth Server Actions and validated return paths |
| `lib/supabase/`, `proxy.ts` | Browser/server/admin clients, cookie refresh, private-route protection and generated DB types |
| `supabase/migrations/`, `supabase/tests/database/` | Authoritative SQL schema and real Postgres authorization tests |
| `lib/example/`, `components/app/example.tsx`, `app/app/example/` | Removable Example Resource domain |
| `lib/billing/`, `config/catalog.ts` | Server-selected offers, Stripe client, verified paid-through policy, webhook processing and projection |
| `scripts/reconcile-billing.mjs` | Operator-only reconciliation using the same financial policy as webhooks |
| `config/product.ts`, `config/site.ts` | Product identity versus environment-derived site URL/support contact |
| `components/app/`, `components/marketing/`, `components/shared/` | Private app shell, public pages and a small UI primitive/pattern set |
| `tests/`, `.github/workflows/ci.yml` | Focused unit, HTTP-boundary and browser regression checks, plus CI |

`lib/billing/policy.js` is shared with the standalone Node reconciliation script; its corresponding type declaration keeps TypeScript consumers checked. The generated `lib/supabase/database.types.ts` follows the SQL migrations, never the reverse.

## Identity and session boundary

Supabase Auth is the only identity provider. Supported journeys are Google OAuth and verified email/password, including recovery. `@supabase/ssr` manages cookie-backed sessions; the root `proxy.ts` protects `/app` and refreshes cookies. Server mutations authenticate independently instead of relying on a protected page as authorization.

- `/auth/google` starts PKCE with the deployment's registered `/auth/callback` origin; default return is `/app`. Specific return paths are validated against the private allowlist.
- `/auth/callback` exchanges the OAuth code for a session, then redirects to a safe internal path.
- `/auth/confirm` verifies email/recovery token hashes server-side. **Hosted Supabase email templates must link here**, not rely on the default provider verification URL.
- The local E2E presentation bypass is gated outside production. It never authorizes real users or substitutes for hosted Auth verification.

Google client secrets and Resend SMTP credentials live with the relevant providers. No Google/SMTP secret is exposed by the Next.js client.

## Database and authorization boundary

`public.example_resources` is deliberately ordinary private user data. Postgres sets and protects `user_id`; RLS denies cross-user/anonymous access and permits owner read/delete. Create/update require a current Pro entitlement. A database trigger rejects owner changes.

The authenticated app shell loads identity, plan and entitlements only. Dashboard reads the three most recently updated Example summaries; the Example list reads up to 50. Both use `lib/example/queries.ts` with the user's session and select only ID, title and update time. The detail route reads the full individual resource independently, including resources outside the list limit. Existing mutations revalidate the `/app` layout and its pages. Preview fixtures stay separate from live account data.

`public.billing_projection` is a privileged, reconstructible authorization projection. Authenticated clients cannot write it. The canonical current-user `has_pro()` interface accepts **no arbitrary user ID**, protecting both Example and replacement domains.

The SQL migration series is the only schema authority. `pnpm supabase:types` regenerates TypeScript types from the actual local database. Use new versioned migrations for schema changes; do not hand-edit generated types.

## Stripe and access boundary

Checkout selects Prices on the server. Signed webhooks validate Stripe facts and write a privileged billing projection; `has_pro()` checks its confirmed paid period. The browser cannot grant access or write that projection.

See [Billing](BILLING.md) for payment, cancellation and recovery behavior.

## Replacing the Example Resource

Replace the sample domain while keeping Auth and Billing independent:

1. Define your product table through a **new versioned SQL migration**. Derive immutable owner identity with `auth.uid()`; enforce RLS for your actual data model.
2. If creation/editing are Pro-only, use the existing current-user entitlement boundary. Retained own data must stay readable/deletable after downgrade.
3. Regenerate `lib/supabase/database.types.ts` with `pnpm supabase:types`.
4. Replace `lib/example/`, `app/app/example/`, the corresponding UI and navigation/fixtures with your own product domain.
5. Update focused tests for your private routes, ownership rules and mutations. Run the local database suite, tests, build and browser E2E.

**Do not rewrite `lib/auth/`, `lib/billing/` or financial projection logic** to add product-domain behavior. If you need a different business model, you are leaving the supported starter contract.

## Analytics

Vercel Web Analytics loads from the root layout in production builds. It is disabled during local development and browser tests.

## Verification

See [Contributing](../.github/CONTRIBUTING.md) for local checks and [the CI workflow](../.github/workflows/ci.yml) for automation. Hosted configuration is covered in [Setup](SETUP.md); verify the deployed app with the [release checklist](RELEASE-CHECKLIST.md).
