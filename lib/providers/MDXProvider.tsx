"use client";
import React, { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
// css
import "@/app/styles/mdx.css";

const components = {
  h1: (props: any) => <h1 {...props} />,
  h2: (props: any) => <h2 {...props} />,
  h3: (props: any) => <h3 {...props} />,
  p: (props: any) => <p {...props} />,
  // Add other components if needed
};

const MDXProviders = ({ children }: { children: ReactNode }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXProviders;
