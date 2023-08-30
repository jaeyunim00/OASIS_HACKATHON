import parks from "../data/parks";

const park_marker_image = require("../assets/park_marker.png");

const parkMarkers = parks.map((park, index) => ({
  title: park.name,
  description: "",
  coordinate: {
    latitude: park.latitude,
    longitude: park.longitude,
  },
  image: park_marker_image,
}));

export default parkMarkers;
