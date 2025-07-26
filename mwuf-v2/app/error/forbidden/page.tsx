'use client';
import Image from "next/image"
import ForbiddenForm from "./components/forbiddenForm";


export default function ForbiddenPage() {
  return (
    <div>
      <div className="flex flex-col items-center pt-10">
        <Image 
          className = "w-auto h-auto"
          src = "/images/mwuf_logo.png"
          width = {400}
          height = {400}
          alt = "logo"
          priority={true}
          />
      </div>
      <div className = "pt-10">
        <ForbiddenForm></ForbiddenForm>
      </div>
      
    </div>
  );
}
