import type { Metadata } from "next";
import "./globals.css";
import ProgressBar from "@/components/ui/progressbar";
import {Toaster} from 'react-hot-toast';

export const metadata: Metadata = {
  title: "MWUF",
  description: "The official app for the Manila World University Fair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body>
        <ProgressBar />
        {children}
        <Toaster 
          position = "top-center"
          toastOptions={
            {
              duration: 3000
            }
          }
        />
        
      </body>
    </html>
  );
}
