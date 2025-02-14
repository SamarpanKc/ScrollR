"use client";
import React, { useRef, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onUploadSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  filetype?: "image" | "video";
}

export default function FileUpload({
  onUploadSuccess,
  onProgress,
  filetype = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ikUploadRef = useRef<typeof IKUpload>(null); // Correctly type the ref


  const onError = (err: { message: string }) => {
    setUploading(false);
    setError(err.message); // Display the error message
    console.error("Upload Error:", err); // Log the error for debugging
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onUploadSuccess(res);
  };

  const handleProgress = (progress: number) => {
    // Correctly type the progress argument
    setUploading(true);
    setError(null);
    if (onProgress) {
      // Call the provided progress callback
      onProgress(progress);
    }
  };

  const validateFile = (file: File): boolean => {
    if (filetype === "video") {
      if (file.type.startsWith("video/") === false) {
        // Improved video type check
        setError("Invalid file type. Please upload a video file");
        return false;
      }
      if (file.size > 100000000) {
        // 100MB
        setError("File size exceeds the limit of 100MB");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError(
          "Invalid file type. Please upload an image file (jpeg, png, webp)"
        );
        return false;
      }
      if (file.size > 5000000) {
        // 5MB
        setError("File size exceeds the limit of 5MB");
        return false;
      }
    }
    return true; // Return true if validation passes
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={filetype === "video" ? "video.mp4" : "image.jpg"}
        useUniqueFileName={true}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        transformation={{
          pre: "l-text,i-Imagekit,fs-50,l-end",
          post: [
            {
              type: "transformation",
              value: "w-100",
            },
          ],
        }}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      <p>Custom Upload Button</p>
      <button onClick={() => ikUploadRef.current?.click()}>Upload</button>{" "}
      {/* Optional chaining */}
      <p>Abort upload request</p>
      <button onClick={() => ikUploadRef.current?.abort()}>
        Abort request
      </button>{" "}
      {/* Optional chaining */}
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message */}
      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="animate-spin" />
          <span>Uploading...</span>
        </div>
      )}
    </div>
  );
}
