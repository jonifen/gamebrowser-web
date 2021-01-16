import { saveFavourites, getFavourites, clearFavourites } from "../../repositories/server-list-repository";
import localforage from "localforage";

describe("Server List Repository tests", () => {
  it("saveFavourites() should call localStorage.setItem with a payload", () => {
    // Arrange
    const testServerList = [{"game": "quake3arena", "ipAddress": "127.0.0.1", "port": 27960}];

    const setItemMock = jest.spyOn(localforage, "setItem")
      .mockImplementation((serverList) => {});

    // Act
    saveFavourites(testServerList);

    // Assert
    expect(setItemMock).toBeCalledWith("favourites", testServerList);
  });

  it("getFavourites() should call localStorage.getItem and receive payload", () => {
    // Arrange
    const getItemMock = jest.spyOn(localforage, "getItem")
      .mockImplementation(() => { });

    // Act
    const actual = getFavourites();

    // Assert
    expect(getItemMock).toBeCalledWith("favourites");
  });

  it("clearFavourites() should call localStorage.removeItem", () => {
    // Arrange
    const removeItemMock = jest.spyOn(window.localStorage.__proto__, "removeItem")
      .mockImplementation(() => {});

    // Act
    clearFavourites();

    // Assert
    expect(removeItemMock).toBeCalled();
  });
});