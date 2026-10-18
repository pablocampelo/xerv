# Billing runbook

This runbook covers the supported operational path for Xerv Stripe Billing. Stripe remains the financial source of truth; the local database contains a minimal reconstructible projection used for authorization.

## Before operating

Confirm that the Stripe key, webhook secret, Price IDs and Supabase project belong to the intended environment. Keep test and live credentials separate, never use browser-supplied financial identifiers, and keep secrets out of logs and tickets.

## Normal billing path

The [architecture](ARCHITECTURE.md#request-and-financial-flows) describes the payment flow. A Checkout success redirect does not grant Pro.

A supported `invoice.paid` can establish or extend access only when the invoice contains positive payment evidence for the mapped subscription/Price and a valid financial period.

An archived Price can remain valid for an already-mapped historical subscription. Price `active` is required for new purchases, not for retaining a legitimate historical subscription mapping.

## Local webhook debugging

Use the listener and signing-secret instructions in [Setup](SETUP.md#4-stripe-test-mode). Successful deliveries return `2xx` from `/api/stripe/webhook`.

If Checkout returned successfully but Billing remains confirming, first verify whether `invoice.paid` reached the webhook. Do not grant Pro manually from the browser redirect.

## Event processing failures

`billing_event_receipts` is the idempotency ledger.

Terminal states are `processed`, `ignored` and `failed`.

A currently processing event is treated as busy. A processing lease older than five minutes is reclaimable, which allows Stripe retry or an operator resend to recover from a worker crash after a partial durable write.

Projection writes are monotonic/idempotent where financial access is concerned:

- older subscription-state events cannot overwrite a newer state marker;
- paid-through never moves backwards;
- replaying a paid invoice cannot create a second paid period.

If a webhook returns `500`, inspect the application log for the safe billing error code and let Stripe retry. Do not edit the projection directly as the first response.

## Reconciliation

Reconciliation reads provider facts and compares them with the local projection. It is dry-run by default.

All accounts:

```sh
pnpm billing:reconcile
```

One account:

```sh
pnpm billing:reconcile -- --user <supabase-user-uuid>
```

The output reports drift by field and does not print provider secrets.

Apply only after reviewing the dry-run and confirming the environment:

```sh
pnpm billing:reconcile -- --apply
```

or:

```sh
pnpm billing:reconcile -- --user <supabase-user-uuid> --apply
```

Reconciliation can repair:

- a completed Checkout Session whose local attempt remained `created`;
- current subscription/customer/Price/interval/status projection drift;
- a missing or stale paid-through when Stripe contains a later supported positive paid period;
- an expired stale Checkout attempt.

It fails closed instead of granting access when it finds unsupported recurrence/currency/amount, inconsistent identity, unsupported paid-access state or multiple current subscriptions.

There is no default reconciliation cron or automatic recovery SLA. If Stripe exhausts webhook retries, operator intervention may be required.

## Cancellation and payment failure

Cancellation and failed renewal do not extend `paid_through`. Previously confirmed Pro access remains until that period ends; subscription status alone cannot grant another period.

## Refunds and disputes

Refunds and disputes do not create new access. Their selected Stripe webhook events are retained in the event receipt ledger as ignored financial events; they do not extend or automatically shorten `paid_through`.

There is no automatic revocation policy. Reconciliation does not shorten a confirmed paid period; a business policy that requires revocation needs an explicit policy change, not a manual projection edit.

## Checkout concurrency

Only one open local Checkout attempt is allowed per user. Concurrent creation races are resolved by the database uniqueness boundary and the server action reuses, waits for or expires the existing attempt.

If an attempt was created but no Stripe Session was linked because the process crashed, a later Checkout request can expire the stale attempt after the preparation window. Reconciliation also diagnoses/clears stale attempts when applied.

## Deployment verification

Use the [billing checks](RELEASE-CHECKLIST.md#billing) against the deployed commit and its configured providers.
