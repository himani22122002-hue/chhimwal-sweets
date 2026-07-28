import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

const ImageUploader = ({ onImageSelected }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageSelected(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#7B1E2B] mb-2">Upload Image</label>
      <div
        className="border-2 border-dashed border-[#7B1E2B]/30 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#7B1E2B] transition"
        onClick={() => fileInputRef.current.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-32 rounded" />
        ) : (
          <div className="flex flex-col items-center text-[#7B1E2B]/60">
            <Upload size={32} />
            <span className="mt-2 text-sm">Click to upload</span>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
