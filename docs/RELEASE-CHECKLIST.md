# Release checklist

Run these checks against the deployed commit. Configuration instructions live in [Setup](SETUP.md); this checklist records what to verify.

## Repository and deployment

- [ ] CI passes for the release commit; no credentials or customer records are committed.
- [ ] Brand, support contact and legal templates are customized for the product.
- [ ] The public domain serves the intended deployment without a team login; previews remain protected.
- [ ] Public links, mobile layouts, keyboard navigation, sitemap and social image work; private pages are noindex.
- [ ] Test and production providers are isolated, migrations are applied, and Auth and billing return to the canonical app origin.

## Authentication and private data

- [ ] Hosted email templates and SMTP are configured; test with fresh links.
- [ ] Signup → confirmation email → authenticated app; resend and expired/invalid links behave correctly.
- [ ] Recovery email → password change → login with the new password.
- [ ] Google sign-in, logout and return paths work.
- [ ] Anonymous access and cross-user access are denied; Pro gates creation/editing while owners retain read/delete after downgrade.

For callback or email-link failures, check [Auth URL configuration](SETUP.md#auth-url-configuration).

## Billing

Use Stripe test mode to exercise these scenarios before going live. Confirm the live deployment uses its own matching keys, Prices and webhook secret.

- [ ] Monthly and annual Checkout, positive paid invoice → Pro, and Customer Portal work.
- [ ] Access updates even if the browser closes before the webhook; a return URL alone never grants Pro.
- [ ] Failed renewals do not extend access; cancellation retains only the confirmed paid period.
- [ ] Duplicate, reordered and concurrent webhook deliveries do not duplicate access or overwrite newer state.
- [ ] Reconciliation dry-run reports expected drift; reviewed apply repairs it in the test environment.

For failures and financial policy, use the [Billing runbook](BILLING.md).
