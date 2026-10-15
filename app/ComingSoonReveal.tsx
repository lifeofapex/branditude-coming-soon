"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { thunderBold } from "./fonts";

export default function ComingSoonReveal() {
  const [peel, setPeel] = useState(0.5);
  const [dragging, setDragging] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = rectRef.current;
    if (!rect || !rect.width) return;
    let progress = (clientX - rect.left) / rect.width;
    progress = Math.min(1, Math.max(0, progress));
    setPeel(progress);
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(false);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerMove]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      rectRef.current = e.currentTarget.getBoundingClientRect();
      setDragging(true);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      updateFromClientX(e.clientX);
    },
    [handlePointerMove, handlePointerUp, updateFromClientX]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const panelWidth = `${(1 - peel) * 100}%`;
  const edgeLeft = `${peel * 100}%`;

  return (
    <div
      onPointerDown={handlePointerDown}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        background: "var(--branditude-lavender)",
        overflow: "hidden",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <svg
        viewBox="0 0 1080 1080"
        style={{
          position: "absolute",
          width: "clamp(280px, 60vw, 640px)",
          height: "clamp(280px, 60vw, 640px)",
          right: "-12vw",
          bottom: "-14vw",
          opacity: 0.05,
          pointerEvents: "none",
        }}
      >
        <path
          d="M443.697,274.761C443.697,255.187 428.89,239.077 409.867,237.006C425.306,225.701 430.075,204.346 420.287,187.394C410.5,170.443 389.622,163.894 372.112,171.612C379.83,154.103 373.282,133.224 356.33,123.437C339.379,113.65 318.023,118.418 306.718,133.858C304.648,114.834 288.538,100.027 268.963,100.027C249.389,100.027 233.279,114.834 231.208,133.858C219.904,118.418 198.548,113.65 181.596,123.437C164.645,133.224 158.096,154.103 165.815,171.612C148.305,163.894 127.426,170.443 117.639,187.394C107.852,204.346 112.621,225.701 128.06,237.006C109.037,239.077 94.229,255.187 94.229,274.761C94.229,294.335 109.037,310.446 128.06,312.516C112.621,323.821 107.852,345.177 117.639,362.128C127.426,379.08 148.305,385.628 165.815,377.91C158.096,395.42 164.645,416.298 181.596,426.085C198.548,435.872 219.904,431.104 231.208,415.665C233.279,434.688 249.389,449.495 268.963,449.495C288.538,449.495 304.648,434.688 306.718,415.665C318.023,431.104 339.379,435.872 356.33,426.085C373.282,416.298 379.83,395.42 372.112,377.91C389.622,385.628 410.5,379.08 420.287,362.128C430.075,345.177 425.306,323.821 409.867,312.516C428.89,310.446 443.697,294.335 443.697,274.761Z"
          fill="var(--branditude-purple)"
        />
      </svg>

      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(16px, 4vw, 28px)",
            padding: "clamp(28px, 8vh, 60px) clamp(20px, 6vw, 32px)",
            maxWidth: 720,
            width: "100%",
            textAlign: "center",
          }}
        >
          <img
            src="/branditude-logo-purple.webp"
            alt="Branditude"
            style={{
              width: "clamp(200px, 55vw, 340px)",
              maxWidth: "100%",
              height: "auto",
              display: "block",
            }}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--branditude-purple)",
              borderRadius: 50,
              padding: "clamp(8px, 2vw, 10px) clamp(18px, 5vw, 26px)",
            }}
          >
            <span
              className={thunderBold.className}
              style={{
                fontSize: "clamp(15px, 4vw, 20px)",
                letterSpacing: "0.08em",
                color: "var(--branditude-yellow)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Coming Soon
            </span>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--branditude-hint-grey)",
            }}
          >
            Drag to reveal
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(15px, 4vw, 20px)",
              lineHeight: 1.6,
              color: "var(--branditude-body-grey)",
              maxWidth: 560,
            }}
          >
            Branditude Limited builds sharper brands for ambitious teams. We
            shape strategy, identity, content and digital moments that help
            people choose you.
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: panelWidth,
          background: "var(--branditude-purple)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: edgeLeft,
          width: 0,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 28,
            transform: "translateX(-14px)",
            boxShadow: "10px 0 26px rgba(10,10,10,0.16)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 68,
            background: "var(--branditude-off-white)",
            borderRadius: 8,
            boxShadow: "0 8px 18px rgba(10,10,10,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <span
            style={{
              width: 2,
              height: 26,
              background: "var(--branditude-purple)",
              borderRadius: 1,
            }}
          />
          <span
            style={{
              width: 2,
              height: 26,
              background: "var(--branditude-purple)",
              borderRadius: 1,
            }}
          />
        </div>
      </div>

      {/* Who stands behind the site, for anyone checking the company: always on
          top of the drag panel, and not part of the drag. */}
      <footer
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 4,
          padding: "12px 16px",
          background: "var(--branditude-off-white)",
          borderTop: "1px solid rgba(124,73,189,0.18)",
          color: "var(--branditude-ink)",
          fontSize: 12,
          lineHeight: 1.6,
          textAlign: "center",
          cursor: "auto",
          userSelect: "text",
        }}
      >
        <div>
          <strong>Branditude Limited</strong> · RC 1995669 · 350 Borno Way, Lagos, Nigeria
        </div>
        <div style={{ color: "var(--branditude-body-grey)" }}>
          Makers of Mutua:{" "}
          <a href="https://www.mutua.ng" target="_blank" rel="noopener noreferrer">
            www.mutua.ng
          </a>
        </div>
      </footer>
    </div>
  );
}
