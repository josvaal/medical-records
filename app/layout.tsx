"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/database";
import { onAuthStateChanged } from "firebase/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  if (loading) {
    return (
      <html lang="en" className="dark">
        <head>
          <title>Historiales médicos</title>
        </head>
        <body>
          <p>Loading...</p>
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

