import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ selectedImages, setSelectedImages }: { selectedImages: any, setSelectedImages: any }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imagePromises: Promise<string>[] = acceptedFiles.map((image) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(image);
      });
    });

    Promise.all(imagePromises).then((results) => {
      setSelectedImages([...selectedImages, ...results]);
    });
  }, [selectedImages, setSelectedImages]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
    type: file
  });

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_: string, i: number) => i !== index);
    setSelectedImages(updatedImages);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="dropzone text-center border-dashed border-2 border-secondary p-6 rounded-md"
      >
        <input {...getInputProps()} />
        <p className="text-primary">Drag 'n' drop images here, or click to select</p>
      </div>

      {selectedImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Selected Images</h2>
          <div className="flex flex-wrap">
            {selectedImages.map((image: string, index: number) => (
              <div key={index} className="relative m-2">
                <img
                  src={image}
                  alt={`Selected ${index + 1}`}
                  className="w-[100px] h-[100px] object-cover rounded-md"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-[-5px] right-[-5px] bg-secondary text-neutral rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
