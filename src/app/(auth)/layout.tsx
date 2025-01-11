import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "@/lib/utils/SessionProvider";

const raleway = Raleway({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Wallet web Application ",
  description: "Generated cash management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={` ${raleway.className} antialiased`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
