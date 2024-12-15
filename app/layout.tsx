"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useStore } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
    } else {
      try {
        const parsedUser = JSON.parse(user);

        if (parsedUser.dni === "12345678" && parsedUser.password === "admin123") {
          router.push("/");
        }
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
        router.push("/login");
      }
    }
    setLoading(false);
  }, [router]);

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
