import {
  atom,
  atomFamily,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

interface IImage {
  id: number;
  name: string;
  url: string;
  metadata: {
    width: string;
    height: string;
  };
}

const getImage = async (id: number) => {
  return new Promise<IImage>((resolve) => {
    const url = `https://res.cloudinary.com/dqsubx7oc/image/upload/w_149,h_104/g_auto/recoil-demo/${id}.png`;
    // 이미지 url을 변수를 통해 동적으로 제어, 나중을 위해 미리 이미지를 로딩, 이미지의 크키를 바로 구할 때
    let image = new Image();
    image.onload = () =>
      resolve({
        id,
        name: `Image ${id}`,
        url,
        metadata: {
          width: `${image.width}px`,
          height: `${image.height}px`,
        },
      });
    image.src = url;
  });
};

// atom패밀리는 내부적으로 각 atom에 고유한 id 부여와 더불어, 메모제이션 해줌.
export const imageState = atomFamily({
  key: "imageState",
  // Component가 imageState를 최초로 호출할 때, default 값을 만드는 함수가 호출됨.
  default: async (id: number) => getImage(id),
});

export const imageListState = atom({
  key: "imageListState",
  default: [1, 2, 3],
});

export const selectedImageId = atom({
  key: "selectedImageId",
  default: 1,
});

export const selectedImage = selector({
  key: "selectedImage",
  get: ({ get }) => {
    const id = get(selectedImageId);
    const image = get(imageState(id));

    return image;
  },
  set: ({ get, set }, newValue?: any) => {
    const imageList = get(imageListState);
    if (imageList.length === 6) return;
    set(imageListState, [...imageList, imageList.length + 1]);
  },
});
