"use client";
import React from "react";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

export default function Providers({ children }: { children: React.ReactNode }) {
  
  const authenticator = async () => {
    try {
      console.log("🔄 Fetching new ImageKit authentication parameters...");
      
      const response = await fetch("/api/imagekit-auth", {
        method: "GET",
        cache: "no-store", // Ensure a fresh request
      });
  
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("✅ ImageKit Auth Data:", data);
  
      if (!data.token || !data.signature || !data.expire) {
        throw new Error("❌ Missing authentication parameters");
      }
  
      return data;
    } catch (error) {
      console.error("ImageKit authentication failed:", error);
      throw error;
    }
  };
  
  
  
  return (
    <SessionProvider>
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
