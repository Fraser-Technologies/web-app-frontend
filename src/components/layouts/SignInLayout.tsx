import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "../Header";

interface Props {
  children: React.ReactNode;
  user?: string;
  bg?: string;
  childClass?: string;
  title?: string;
  pageDescription?: string;
  pageKeywords?: string;
}

const Layout = ({
  children,
  bg,
  childClass,
  title,
  pageDescription,
  pageKeywords,
}: Props) => {
  return (
    <div className="overflow-hidden h-full font-sans">
      <Helmet>
        <meta name="description" content={pageDescription} charSet="utf-8" />
        <meta name="keywords" content={pageKeywords} charSet="utf-8" />
        <title>{title || "Fraser"}</title>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Fraser" />
      </Helmet>
      <div className={`h-full ${bg}`}>
        <Header />
        <div className="h-[70px]"></div>
        <div className={`${childClass}`}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
