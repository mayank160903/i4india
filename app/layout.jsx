"use client";

import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from "@components/Footer";
import DynamicHero from "@components/DynamicHero";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <DynamicHero />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}
