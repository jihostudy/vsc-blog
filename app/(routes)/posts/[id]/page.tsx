import React, { ReactNode, Suspense } from "react";
// MDX
import { MDXRemote } from "next-mdx-remote/rsc";
// Types
import { tabType } from "@/lib/templates/tab";
import { postType } from "@/lib/templates/post";
//

const components = {
  h1: (props: any) => (
    <h1 {...props} className="text-9xl">
      {props.children}
    </h1>
  ),
};

function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}

const Page = ({ params }: { params: { postID: string } }): ReactNode => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <CustomMDX source={`# Hello world!`} />
    </Suspense>
  );
};

export default Page;
