import MainHeader from "@/components/main-header/main-header";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Locale, i18n } from '@/i18n.config';
import "../globals.css";
import StoreProvider from "../StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "just stee fortify",
  description: "Created by .stee for the community",
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <StoreProvider>
    <html lang={params.lang}>
      <body className={inter.className}>
        <MainHeader lang={params.lang} />
        <main>
          {children}
        </main>
      </body>
    </html>
    </StoreProvider>
  );
}


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <main>
//       {children}
//     </main>
//   );
// }
