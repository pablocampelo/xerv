# Social previews

## Website

[app/opengraph-image.tsx](../app/opengraph-image.tsx) generates the 1280 × 640 PNG used by the website and README. [app/layout.tsx](../app/layout.tsx) declares the Open Graph and Twitter image metadata. Set `NEXT_PUBLIC_SITE_URL` to your public origin.

## GitHub repository

Keep **Settings → Social preview** without a custom image to use GitHub's automatic repository card, including its statistics. If a custom image is set, remove it from that setting.

The website image and repository card are independent. Changing the README image does not change the repository's social preview. Confirm the card in the destination platform before sharing; its preview may differ from GitHub's current metadata.
