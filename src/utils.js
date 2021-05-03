import Geohash from "latlon-geohash";

export const getCoordinate = (geohash) => {
  const { lat, lon } = Geohash.decode(geohash);
  return [lon, lat];
};

export const getGeohash = ([lon, lat]) => Geohash.encode(lat, lon, 12);

export const isFileImage = (file) => {
  return file && file.type.split("/")[0] === "image";
};
