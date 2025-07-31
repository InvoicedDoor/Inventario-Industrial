import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import 'bootswatch/dist/pulse/bootstrap.min.css'
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventario industrial",
  description: "App to manage your inventory",
  icons: "/inventario_industrial.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <nav className="navbar navbar-expad-lg bg-primary">
          <div className="container-fluid">
            <a href="#" className="navbar-brand">
              <Image
                src={"/inventario_industrial.svg"}
                alt=""
                className="bg-white"
                style={{ borderRadius: "100%" }}
                width={50}
                height={50} />
            </a>
          </div>
        </nav>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
