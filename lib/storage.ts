// lib/storage.ts
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

const compressImageFile = async (file: File, maxWidth = 1920, quality = 0.8): Promise<File> => {
  if (!file.type.startsWith("image/") || file.size <= 3 * 1024 * 1024) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, maxWidth / bitmap.width);
    const width = Math.round(bitmap.width * ratio);
    const height = Math.round(bitmap.height * ratio);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, file.type, quality)
    );

    if (!blob) return file;
    return new File([blob], file.name, { type: blob.type });
  } catch (error) {
    return file;
  }
};

export interface UploadResult {
  url: string;
  path: string;
}

export const uploadFile = async (
  file: File,
  folder: string,
  onProgress: (progress: number) => void
): Promise<UploadResult> => {
  const fileToUpload = await compressImageFile(file);
  return new Promise((resolve, reject) => {
    const ext = fileToUpload.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const path = `${folder}/${fileName}`;
    const storageRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ url, path });
      }
    );
  });
};

export const deleteFile = async (path: string) => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

export const downloadFile = async (url: string, filename: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
};

export const validateFile = (
  file: File,
  options: { maxSizeMB?: number; allowedTypes?: string[] }
) => {
  const { maxSizeMB = 50, allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif", "video/mp4", "video/quicktime"] } = options;

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type not supported. Allowed: ${allowedTypes.join(", ")}`);
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > maxSizeMB) {
    throw new Error(`File size too large. Max: ${maxSizeMB}MB`);
  }

  return true;
};
