export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="w-[80vw] bg-post h-screen text-white overflow-y-hidden">
      {children}
    </div>
  );
}
