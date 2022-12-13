import React from "react";
import ImageList from "./ImageList/ImageList";
import Metadata from "./ImageList/Metadata";
import { useRecoilState } from "recoil";
import { selectedImage } from "./store";
import "./App.css";

function App() {
  const [, addImage] = useRecoilState(selectedImage);

  const handleClick = () => {
    addImage("");
  };
  return (
    <div className="App">
      <div className="image-page">
        <ImageList />
        <Metadata />
      </div>
      <button onClick={handleClick}>Add Image</button>
    </div>
  );
}

export default App;
