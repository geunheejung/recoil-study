import React, { useCallback, useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

// 동물 목록 상태
const animalsState = atom({
  key: "animalsState",
  default: [
    {
      name: "Rexy",
      type: "Dog",
    },
    {
      name: "Oscar",
      type: "Cat",
    },
  ],
});
// 필터링 동물 상태
const animalFilterState = atom({
  key: "animalFilterState",
  default: "All",
});
// 파생된 동물 필터링 목록
const filteredAnimalsState = selector({
  key: "animalListState",
  get: ({ get }) => {
    const filter = get(animalFilterState);
    const animals = get(animalsState);

    if (filter === "All") return animals;

    return animals.filter((animal) => animal.type === filter);
  },
});

const Animal = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [animal, setAnimal] = useRecoilState(animalsState);
  const filteredAnimal = useRecoilValue(filteredAnimalsState);
  const [, setFilterKeyword] = useRecoilState(animalFilterState);

  const filterAnimal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { value } = e.currentTarget;
      setFilterKeyword(value);
    },
    [animal, filteredAnimal]
  );

  const handleChangeAnimal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, id },
    } = e;

    id === "name" ? setName(value) : setType(value);
  };

  const handleSubmitAnimal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!name || !type) return;

    console.log(`Add ${name}, ${type}`);

    setAnimal((prev) => [...prev, { name, type }]);
  };

  const btnStyle = {
    width: "50px",
    height: "50px",
    background: "#ccc",
    margin: "0 5px",
  };
  return (
    <div>
      <div>
        <label htmlFor="add-animal">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChangeAnimal}
          placeholder="Name"
        />
      </div>
      <div>
        <label htmlFor="add-animal">Type</label>
        <input
          id="type"
          name="type"
          type="text"
          onChange={handleChangeAnimal}
          placeholder="Type"
        />
      </div>
      <button onClick={handleSubmitAnimal}>Add</button>
      <h2>Filter</h2>
      <button style={btnStyle} value="All" onClick={filterAnimal}>
        All
      </button>
      <button style={btnStyle} value="Dog" onClick={filterAnimal}>
        Dogs
      </button>
      <button style={btnStyle} value="Cat" onClick={filterAnimal}>
        Cats
      </button>

      <h1>Animals:</h1>
      <ul>
        {filteredAnimal.map((raw) => (
          <li key={raw.name}>{`${raw.name} --> ${raw.type}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Animal;
