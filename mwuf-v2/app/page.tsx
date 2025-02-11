import Image from "next/image"

export default function Home() {
  return (
    <div>
      <Image 
        className = ""
        src = "/images/mwuf_logo.png"
        width = {500}
        height = {500}
        alt = "logo"
        />
    </div>
  );
}
