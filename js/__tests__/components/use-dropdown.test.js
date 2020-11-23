import React from "react";
import {render, cleanup, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useDropdown from "../../components/use-dropdown.jsx";

afterEach(cleanup);

describe("<useDropdown />", () => {
  it("should render without crashing", () => {
    const { result } = renderHook(() => useDropdown("", "", []));

    expect(result).toBeDefined();
  });

  it("should render a disabled dropdown with only one item included when no options provided", () => {
    const { result } = renderHook(() => useDropdown("Test", "", []));
    const { getByTestId } = render(result.current[1]());
    const dropdown = getByTestId("use-dropdown-test");

    expect(dropdown.disabled).toEqual(true);
  });

  it("should render a dropdown with a second item of 'Interesting' when provided as an option", () => {
    const { result } = renderHook(() => useDropdown("Test", "", ["Interesting"]));
    const { getByTestId } = render(result.current[1]());
    const dropdown = getByTestId("use-dropdown-test");

    expect(dropdown.children[1].textContent).toEqual("Interesting");
  });

  it("should change dropdown selected value when changed to 'Interesting'", () => {
    // Arrange
    const { result } = renderHook(() => useDropdown("Test", "", ["Interesting"]));
    const { getByTestId } = render(result.current[1]());
    const dropdown = getByTestId("use-dropdown-test");

    // Act
    fireEvent.change(dropdown, { target: { value: "Interesting" } });

    // Assert
    expect(result.current[0]).toEqual("Interesting");
  });
});