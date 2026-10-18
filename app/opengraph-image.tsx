import { ImageResponse } from "next/og";

/** Shared social image. Repository preview setup: docs/SOCIAL-PREVIEW.md. */
export const alt = "Xerv — Build the product. Not the infrastructure. Open-source SaaS foundation.";
export const size = { width: 1280, height: 640 };
export const contentType = "image/png";

const white = "#f7f8f8";
const muted = "#a3a9b4";
const lime = "#e4f222";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#08090a",
        color: white,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 84,
          padding: "0 90px",
          borderBottom: "1px solid #222327",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="34" height="34" viewBox="0 0 100 100" aria-label="Split X" role="img">
            <path fill={lime} d="M8 12H37L48 27 36 40H34L8 12Z" />
            <path fill={lime} d="M7 89H32L93 12H69L7 89Z" />
            <path fill={lime} d="M63 60H73L94 89H69L54 72Z" />
          </svg>
          <span style={{ fontWeight: 600, fontSize: 25, letterSpacing: -0.5 }}>Xerv</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 15 }}>
          <span style={{ color: muted }}>Pricing</span>
          <span style={{ color: muted }}>FAQ</span>
          <span style={{ color: muted }}>GitHub</span>
          <span style={{ color: muted }}>Log in</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 42,
              padding: "0 20px",
              borderRadius: 999,
              backgroundColor: white,
              color: "#08090a",
              fontWeight: 600,
            }}
          >
            Get started
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          padding: "8px 90px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 77,
            lineHeight: 1.08,
            letterSpacing: -3.7,
            fontWeight: 600,
          }}
        >
          <span>Build the product.</span>
          <span style={{ color: muted }}>Not the infrastructure.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 36,
            fontSize: 20,
            lineHeight: 1.5,
            color: "#c5cbd4",
          }}
        >
          <span>The open-source Next.js foundation for authentication, private data,</span>
          <span>subscriptions, email and deployment. Clone Xerv, add your brand and</span>
          <span>build what makes your product different.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 31, fontSize: 17 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              padding: "0 26px",
              borderRadius: 999,
              backgroundColor: "#ffffff",
              color: "#08090a",
              fontWeight: 600,
            }}
          >
            View on GitHub
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              padding: "0 26px",
              borderRadius: 999,
              border: "1px solid #404248",
              color: "#d0d6e0",
            }}
          >
            Explore the app
          </span>
        </div>
      </div>
    </div>,
    size,
  );
}
