'use client'
import { FormLabel } from "@/components/ui/form";
import { IMAGE_BB_KEY } from "@/config"; 
import Avatar from "@/shared/Avatar";
import { useState } from "react";
import toast from "react-hot-toast";
const ImageUpload = ({setWorkPhotos}: {setWorkPhotos : React.Dispatch<React.SetStateAction<string>>}) => {
  const [imageUrl, setImageUrl] = useState('')
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMAGE_BB_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('image upload successfully')
        setWorkPhotos(data.data.url);
        setImageUrl(data.data.url)
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-4">
      <FormLabel className="mb-4 text-left w-full">Work Photos</FormLabel>
      <label
        htmlFor="file-upload"
        className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
      >
        {imageUrl ? (
            <Avatar src={imageUrl} alt="Uploaded" className="w-full h-full object-cover rounded-full" />
          
        ) : (
          <span className="text-gray-400 text-left">Upload Image</span>
        )}
      </label>
      <input id="file-upload" type="file" className="hidden" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUpload;
