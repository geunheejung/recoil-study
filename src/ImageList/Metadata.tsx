import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { imageState, selectedImage } from "../store";

const Metadata = () => {
  const {
    id,
    name,
    url,
    metadata: { width, height },
  } = useRecoilValue(selectedImage);
  const [, setImage] = useRecoilState(imageState(id));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage((prev) => ({ ...prev, name: e.target.value }));
  };

  return (
    <div className="metadata">
      <input type="text" value={name} onChange={handleChange} />
      <div>
        <img src={url} alt={name} />
      </div>
      <p>Id: {id}</p>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};

export default Metadata;
