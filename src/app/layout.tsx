import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ModalContainer } from "./_components/modal/Modal";

export const metadata: Metadata = {
  title: "聊天室",
  description: "浙江大学X-Lab全栈项目",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <ModalContainer>
            {children}
          </ModalContainer>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
