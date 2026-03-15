import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    {
      path: "/fonts/inter/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    { path: "/fonts/inter/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
});
