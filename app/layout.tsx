"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/database";
import { onAuthStateChanged } from "firebase/auth";
import { Loader } from "lucide-react";
import { useStore } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useStore()
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User state changed:", user);
      if (!user) {
        router.push("/login");
      } else {
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <html lang="en" className="dark">
        <head>
          <title>Historiales médicos</title>
        </head>
        <body className="flex justify-center items-center w-full h-screen">
          <Loader className="mr-2 h-20 w-20  animate-spin" />
        </body>
      </html>
    );
  }

  if (loading) {
    return (
      <html lang="en" className="dark">
        <head>
          <title>Historiales médicos</title>
        </head>
        <body className="flex justify-center items-center w-full h-screen">
          <Loader className="mr-2 h-20 w-20  animate-spin" />
        </body>
      </html>
    );
  }


  return (
    <html lang="en" className="dark">
      <head>
        <title>Historiales médicos</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

