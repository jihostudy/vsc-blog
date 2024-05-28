import React, { ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";

const components = {
  // Custom components can be added here
};

const MyMDXProvider = ({ children }: { children: ReactNode }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MyMDXProvider;
