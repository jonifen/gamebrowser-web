import localforage from "localforage";

localforage.config({
  name: "GameBrowser Web"
});

export async function getFavourites() {
  console.log("Fetching favourites from DB");
  return await localforage.getItem("favourites") || [];
}

export async function saveFavourites(favourites) {
  await localforage.setItem("favourites", favourites);
}

export async function clearFavourites() {
  await localStorage.removeItem("favourites");
}
