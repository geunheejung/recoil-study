import React, { Suspense } from "react";
import { useRecoilValue } from "recoil";
import Image from "./Image";
import { imageListState } from "../store";

const ImageList = () => {
  const imageList = useRecoilValue(imageListState);
  return (
    <div className="image-list">
      {imageList.map((id) => (
        <Suspense key={id} fallback="Loading...">
          <Image id={id} />
        </Suspense>
      ))}
    </div>
  );
};

export default ImageList;
