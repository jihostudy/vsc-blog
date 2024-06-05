// Types
// MDX
import { MDXRemote } from "next-mdx-remote/rsc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Hr = () => <hr className="my-4 wavy-hr" />;

const components = {
  h1: (props: any) => (
    <h1 {...props} className="my-4 text-4xl font-bold">
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 {...props} className="my-4 text-3xl font-semibold">
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h1 {...props} className="my-4 text-2xl font-semibold">
      {props.children}
    </h1>
  ),
  h4: (props: any) => (
    <h2 {...props} className="my-4 text-xl font-semibold">
      {props.children}
    </h2>
  ),
  p: (props: any) => (
    <p {...props} className="my-4 text-base leading-7">
      {props.children}
    </p>
  ),
  strong: (props: any) => (
    <strong {...props} className="font-bold">
      {props.children}
    </strong>
  ),
  a: (props: any) => (
    <a {...props} className="my-4 text-blue-500 underline" target="_blank">
      {props.children}
    </a>
  ),
  ol: (props: any) => (
    <ol {...props} className="my-4 list-decimal list-inside marker:text-white">
      {props.children}
    </ol>
  ),
  ul: (props: any) => (
    <ul {...props} className="my-4 list-disc list-inside marker:text-white">
      {props.children}
    </ul>
  ),
  li: (props: any) => (
    <li {...props} className=" my-4">
      {props.children}
    </li>
  ),
  em: (props: any) => (
    <em {...props} className="italic">
      {props.children}
    </em>
  ),
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="my-4 pl-4 border-l-4 border-gray-500 italic"
    >
      {props.children}
    </blockquote>
  ),
  hr: Hr,
  code: ({ className, children }: any) => {
    const language = className.replace("language-", "");
    return (
      <SyntaxHighlighter
        style={materialDark}
        language={language}
        showLineNumbers
        wrapLines
        customStyle={{
          display: "inline-block",
          width: "auto",
          backgroundColor: "#1E201F",
          border: "1px solid white",
          borderRadius: "5px",
          padding: "1em",
          whiteSpace: "pre-wrap",
          color: "white",
        }}
        lineNumberStyle={{ color: "white" }}
      >
        {children}
      </SyntaxHighlighter>
    );
  },
};

export default function MDXRemoteProvider(props: any) {
  return (
    <div className="w-full px-10">
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  );
}
