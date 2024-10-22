import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreviews: string[];
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setSelectedImages,
  imagePreviews,
  setImagePreviews,
}) => {
  const handleImageUpload = useCallback(
    async (acceptedFiles: File[]) => {
      const compressedImages = await Promise.all(
        acceptedFiles.map(async (file) => {
          return file;
        })
      );

      setSelectedImages((prev) => [...prev, ...compressedImages]);
      const newPreviews = compressedImages.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    },
    [setSelectedImages, setImagePreviews]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleImageUpload,
    accept: { "image/*": [] },
  });

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="image-upload-container">
      {/* Drag and drop area */}
      <div
        {...getRootProps()}
        className={`border-dashed border-2 p-8 rounded-lg ${
          isDragActive ? "border-primary" : "border-secondary"
        } cursor-pointer text-center`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-primary">Drop the files here...</p>
        ) : (
          <p className="text-primary">
            Drag 'n' drop some images here, or click to select files
          </p>
        )}
      </div>

      {/* Image previews */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`preview-${index}`}
              className="object-cover w-full h-32 rounded-lg"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute w-[30px] h-[30px] text-2xl top-[-5px] right-[-5px] bg-secondary text-white rounded-[50%]"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
