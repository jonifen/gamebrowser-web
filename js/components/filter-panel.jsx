import React from "react";
import useDropdown from "./use-dropdown.jsx";

const FilterPanel = () => {
  const games = ["Quake 3 Arena", "Unreal Tournament 99"];
  const countries = ["United Kingdom"];
  const [game, GameDropdown] = useDropdown("Game", "All", games);
  const [country, CountryDropdown] = useDropdown("Country", "All", countries);

  const onClickFilterEvent = (event) => {
    console.log(`User clicked with the game set to '${game}' and country set to '${country}'.`);
  };

  return (
    <React.Fragment>
      <span>Filter: </span>
      <GameDropdown />
      <CountryDropdown />
      <button onClick={onClickFilterEvent}>Filter</button>
    </React.Fragment>
  );
}

export default FilterPanel;