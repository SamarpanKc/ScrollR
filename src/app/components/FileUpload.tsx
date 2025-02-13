"use client";
import React, { useRef } from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { set } from "mongoose";


interface FileUploadProps {
    onUploadSuccess: (res: IKUploadResponse) => void;
    onprogress? : (progress: number) => void;
    filetype?: "image" | "video";
}

export default function FileUpload( {
    onUploadSuccess,
    onprogress,
    filetype = "image"
}: FileUploadProps) {

    const [uploading, setUploading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

  const ikUploadRefTest = useRef(null);

  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const onError = (err:{message: string}) => {
  console.log("Error", err);
  setError(err.message);
  setUploading(false);
};

const handleSucess = (res: IKUploadResponse) => {
  console.log("Success", res);
  setUploading(false);
  setError(null);
  onUploadSuccess(res);
};

// 35:51

const handleStartUpload = (progress) => {
  console.log("Progress", progress);
};

const onUploadStart = (evt) => {
  console.log("Start", evt);
};


  return (
    <div className="App">
      <h1>ImageKit Next.js quick start</h1>
        <p>Upload an image with advanced options</p>
        <IKUpload
          fileName="test-upload.jpg"
          tags={["sample-tag1", "sample-tag2"]}
          customCoordinates={"10,10,10,10"}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={(file) => file.size < 2000000}
          folder={"/sample-folder"}
          {/* extensions={[
            {
              name: "remove-bg",
              options: {
                add_shadow: true,
              },
            },
          ]} */}
          webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
          overwriteFile={true}
          overwriteAITags={true}
          overwriteTags={true}
          overwriteCustomMetadata={true}
          {/* customMetadata={{
            "brand": "Nike",
            "color": "red",
          }} */}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "w-100",
              },
            ],
          }}
          style={{display: 'none'}} // hide the default input and use the custom upload button
          ref={ikUploadRefTest}
        />
        <p>Custom Upload Button</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.click()}>Upload</button>}
        <p>Abort upload request</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>}
      {/* ...other SDK components added previously */}
    </div>
  );
}