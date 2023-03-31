import Image from "next/image";
import React, { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return <div className="flex justify-center">{preview ? <Image src={preview} alt="Photo" width={200} height={200} /> : "Loading..."}</div>;
};

export default PreviewImage;
