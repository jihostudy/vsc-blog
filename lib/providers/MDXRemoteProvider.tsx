// Types
import { tabType } from "@/lib/templates/tab";
import { postType } from "@/lib/templates/post";
// MDX
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h1: (props: any) => (
    <h1 {...props} className="text-9xl">
      {props.children}
    </h1>
  ),
};

export default function MDXRemoteProvider(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
