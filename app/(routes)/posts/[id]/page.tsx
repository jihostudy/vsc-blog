import React, { ReactNode, Suspense } from "react";

import MDXRemoteProvider from "@/lib/providers/MDXRemoteProvider";

const Page = ({ params }: { params: { postID: string } }): ReactNode => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <MDXRemoteProvider source={`# Hello world!`} />
    </Suspense>
  );
};

export default Page;
