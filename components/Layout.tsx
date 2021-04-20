import Head from "next/head";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Dev Events | Hottest events for developers",
  description = "Find the hottest events from the IT branch nearby",
  keywords = "events, dev, development"
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="wrapper">
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
};
