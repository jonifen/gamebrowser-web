import React, { useState } from "react";

const useDropdown = (label, defaultSelected, options) => {
  const [selected, setSelected] = useState(defaultSelected);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const onChangeEvent = (event) => {
    setSelected(event.target.value);
  }

  const Dropdown = () => (
    <label data-testid={`${id}-label`} htmlFor="{id}">
      {label}
      <select data-testid={id} id={id} value={selected} onChange={onChangeEvent} onBlur={onChangeEvent} disabled={!options.length}>
        <option>All</option>
        {
          options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))
        }
      </select>
    </label>
  );

  return [selected, Dropdown];
}

export default useDropdown;