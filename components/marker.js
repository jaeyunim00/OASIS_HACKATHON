import parks from "../data/parks";

const parkMarkers = parks.map((park, index) => ({
  title: park.name,
  description: "",
  coordinate: {
    latitude: park.latitude,
    longitude: park.longitude,
  },
}));

export default parkMarkers;
