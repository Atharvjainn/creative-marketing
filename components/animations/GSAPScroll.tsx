"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/** Height (px) to offset scroll targets by, e.g. a fixed/sticky header. */
const HEADER_OFFSET = 0;

export default function GsapScroll() {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest(
                "a[href]"
            ) as HTMLAnchorElement | null;
            if (!anchor) return;

            if (!anchor.hash) return;
            if (anchor.pathname !== window.location.pathname) return;
            if (anchor.origin !== window.location.origin) return;

            const target = document.querySelector(anchor.hash);
            if (!target) return;

            e.preventDefault();

            gsap.to(window, {
                duration: 1.2,
                ease: "power3.inOut",
                scrollTo: { y: target as HTMLElement, offsetY: HEADER_OFFSET },
            });

            history.pushState(null, "", anchor.hash);
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return null;
}