import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from "@components/Footer";
import DynamicHero from "@components/DynamicHero"; // New client-side component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            <DynamicHero />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}
