import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-screen flex justify-center items-center ">
      Hello world!
    </main>
  );
}

export async function generateMetadata() {
  return {
    title: "성균관대학교 무용학과 콩쿨",
    openGraph: {
      // images: posterImage
    },
  };
}
