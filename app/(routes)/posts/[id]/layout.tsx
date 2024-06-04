export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="flex flex-col justify-start items-start w-[85vw] bg-post h-screen text-white overflow-y-hidden">
      {children}
    </div>
  );
}
