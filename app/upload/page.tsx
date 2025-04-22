// https://console.cloudinary.com/settings/c-901344d4d689e3121d1b4c209d2088/account
// https://console.cloudinary.com/pm/c-901344d4d689e3121d1b4c209d2088/getting-started
// https://next.cloudinary.dev/installation
// https://console.cloudinary.com/settings/c-901344d4d689e3121d1b4c209d2088/upload_presets/new
// https://console.cloudinary.com/console/c-901344d4d689e3121d1b4c209d2088/media_library/search?cld-target-product=digital_asset_management&q=&view_mode=mosaic
// https://demo.cloudinary.com/uw/#/
// Author biplab.cs.nu.bd017@gmail.com

"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;  // Include secure_url here
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleSuccess = (result: any) => {
    console.log("✅ Upload Success:", result);

    if (result.event !== 'success') return;

    const info = result.info as CloudinaryResult;
    setPublicId(info.public_id);  // Set public_id to state
    setImageUrl(info.secure_url); // Set secure_url to state for displaying image

    if (info?.secure_url) {
      console.log("📦 Image URL:", info.secure_url);
    }
  };

  const handleError = (error: any) => {
    console.log("❌ Upload Error:", error);
  };

  return (
    <>
      {/* Show the image if publicId is set */}
      {imageUrl && <CldImage src={imageUrl} alt="Uploaded Image" width={500} height={500} />}

      <div className="p-4">
        <CldUploadWidget
          uploadPreset="uee4fl0m"
          onSuccess={handleSuccess}
          onError={handleError}
          options={{
            sources: [
              "local",
            ]
          }}
        >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Upload an Image
          </button>
        )}
      </CldUploadWidget>
    </div >
    </>
  );
};

export default UploadPage;
