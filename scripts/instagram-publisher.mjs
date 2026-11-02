import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load .env
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a local video/image to Cloudinary to obtain a public HTTPS URL.
 */
export async function uploadToCloudinary(filePath, resourceType = "video") {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  console.log(`☁️  Uploading ${path.basename(filePath)} to Cloudinary...`);
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: resourceType,
    folder: "reels_temp",
  });
  console.log(`✅ Uploaded to Cloudinary! Public URL: ${result.secure_url}`);
  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Deletes an asset from Cloudinary to keep free storage clean.
 */
export async function deleteFromCloudinary(publicId, resourceType = "video") {
  try {
    console.log(`🧹 Deleting temp file (${publicId}) from Cloudinary...`);
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log(`✨ Cloudinary storage cleaned up!`);
  } catch (err) {
    console.warn(`⚠️ Warning: Failed to clean up Cloudinary asset: ${err.message}`);
  }
}

/**
 * Publishes a Reel to Instagram using the official Meta Graph API.
 */
export async function publishReelToInstagram({
  videoUrl,
  caption = "",
  coverUrl = null,
}) {
  const igUserId = process.env.INSTAGRAM_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!igUserId || !accessToken) {
    throw new Error(
      "Missing Instagram credentials in .env! Please set INSTAGRAM_ACCOUNT_ID and INSTAGRAM_ACCESS_TOKEN."
    );
  }

  // 1. Create Media Container
  console.log(`📸 Creating Instagram Reel Media Container...`);
  const createPayload = {
    media_type: "REELS",
    video_url: videoUrl,
    caption: caption,
    access_token: accessToken,
  };
  if (coverUrl) {
    createPayload.cover_url = coverUrl;
  }

  const containerRes = await fetch(
    `https://graph.facebook.com/v21.0/${igUserId}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createPayload),
    }
  );

  const containerData = await containerRes.json();
  if (containerData.error) {
    throw new Error(`Instagram Container Creation Error: ${containerData.error.message}`);
  }

  const creationId = containerData.id;
  console.log(`📦 Media Container Created! Container ID: ${creationId}`);

  // 2. Poll container status until FINISHED
  console.log(`⏳ Waiting for Instagram to process the video...`);
  let status = "IN_PROGRESS";
  let attempts = 0;
  const maxAttempts = 60; // 5 mins max (5s interval)

  while (status === "IN_PROGRESS" && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    attempts++;

    const statusRes = await fetch(
      `https://graph.facebook.com/v21.0/${creationId}?fields=status_code,status&access_token=${accessToken}`
    );
    const statusData = await statusRes.json();

    if (statusData.error) {
      throw new Error(`Status check error: ${statusData.error.message}`);
    }

    status = statusData.status_code;
    console.log(`   [${attempts}] Status: ${status}`);

    if (status === "ERROR" || status === "EXPIRED") {
      throw new Error(`Instagram video processing failed with status: ${status}`);
    }
  }

  if (status !== "FINISHED") {
    throw new Error(`Timeout: Video took too long to process on Instagram.`);
  }

  // 3. Publish the Container
  console.log(`🚀 Publishing Reel to Instagram...`);
  const publishRes = await fetch(
    `https://graph.facebook.com/v21.0/${igUserId}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken,
      }),
    }
  );

  const publishData = await publishRes.json();
  if (publishData.error) {
    throw new Error(`Instagram Publish Error: ${publishData.error.message}`);
  }

  console.log(`🎉 SUCCESS! Reel published to Instagram! Media ID: ${publishData.id}`);
  return publishData;
}

