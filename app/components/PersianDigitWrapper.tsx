"use client";

import { useEffect } from "react";
import { toPersianDigits } from "../utils/toPersianDigits";

export default function PersianDigitWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const convertDigits = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const value = node.nodeValue;
        if (value && /\d/.test(value)) {
          node.nodeValue = toPersianDigits(value);
        }
      } else {
        node.childNodes.forEach(convertDigits);
      }
    };

    convertDigits(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => convertDigits(node));
        if (mutation.type === "characterData") {
          convertDigits(mutation.target);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect(); // cleanup
  }, []);

  return <>{children}</>;
}
