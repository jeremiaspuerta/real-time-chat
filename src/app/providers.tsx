"use client";

import { NextUIProvider } from "@nextui-org/react";
import styles from "@/styles/root-layout.module.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider className={styles.layout}>{children}</NextUIProvider>;
}
