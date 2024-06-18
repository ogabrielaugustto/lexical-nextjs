"use client";
import RichTextLexical from "@/components/rich-text/RichText";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <>
      <div className="h-0">
        <Navbar />
      </div>
      <div className="container items-center h-full">
        <RichTextLexical />
      </div>
    </>
  );
}
