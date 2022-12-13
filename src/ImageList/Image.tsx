import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import classNames from "classnames";
import { imageState, selectedImageId } from "../store";

const Image = ({ id }: { id: number }) => {
  const { name, url } = useRecoilValue(imageState(id));
  const [selectedId, setSelectedId] = useRecoilState(selectedImageId);
  // 현재 선택된 이미지를 불러온다.
  // props로 받은 id와 동일한지 체크한다.

  const handleClick = () => {
    setSelectedId(id);
  };

  return (
    <div
      className={classNames("image", { selected: selectedId === id })}
      onClick={handleClick}
    >
      <div className="name">{name}</div>
      <img src={url} alt={name} />
    </div>
  );
};

export default Image;
