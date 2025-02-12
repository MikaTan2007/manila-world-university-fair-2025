'use client';
import Image from "next/image"
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div>
      <div className="h-screen flex flex-col items-center pt-10">
        <Image 
          className = ""
          src = "/images/mwuf_logo.png"
          width = {400}
          height = {400}
          alt = "logo"
          />
        <Button>Hello</Button>
      </div>
      
    </div>
  );
}
