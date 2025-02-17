import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { NotificationProvider } from "./components/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scroll Reels",
  description: "Full Stack Project with Next.js, Imagekit and MongoDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <Providers>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </Providers>
        </NotificationProvider>
      </body>
    </html>
  );
}
