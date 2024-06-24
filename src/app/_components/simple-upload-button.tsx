// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { toast } from "sonner";

import { useUploadThing } from "~/utils/uploadthing";
import { usePostHog } from "posthog-js/react";

function ImportFileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mr-2 size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

export function MultiUploader() {
  const posthog = usePostHog();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.dismiss("uploading");
      toast("Upload complete!", {
        id: "upload-complete",
        duration: 5000,
      });
      router.refresh();
    },
    onUploadError: () => {
      toast.error("Upload failed!");
    },
    onUploadBegin: () => {
      posthog.capture("upload_started");
      toast("Uploading...", {
        duration: 100000,
        id: "uploading",
      });
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input
        {...getInputProps()}
        className="sr-only"
        id="upload-button"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            const filesArray = Array.from(files);
            startUpload(Array.from(files));
          }
        }}
      />
      <ImportFileIcon />
    </div>
  );
}
