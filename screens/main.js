import React, { useEffect, useState } from "react";

import { View, Text, ActivityIndicator, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

function MainScreen() {
  //고정 마커
  const [initialRegion, setInitialRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  //내 위치
  const [currentLocation, setCurrentLocation] = useState(null);
  //필터링
  const [toiletLocations, setToiletLocations] = useState([]);
  const [showToilets, setShowToilets] = useState(false);
  //현재 화면 뷰포트
  const [viewPort, setViewport] = useState(null);
  //나와 마커사이의 거리
  const [distanceToMarker, setDistanceToMarker] = useState(null);

  //고정마커
  useEffect(() => {
    async function fetchInitialLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setCurrentLocation({ latitude, longitude });
        setLoading(false);
      }
    }
    fetchInitialLocation();
  }, []);

  //내 위치 실시간 마커
  useEffect(() => {
    async function fetchCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 1 }, (location) => {
          const { latitude, longitude } = location.coords;
          setCurrentLocation({ latitude, longitude });
        });
      }
    }
    fetchCurrentLocation();
  }, []);

  //화장실 가져오기
  useEffect(() => {
    async function fetchToiletLocations() {
      // Use Google Maps Places API to fetch toilet locations
      const apiKey = "AIzaSyB5vkO74FzMb8CgWtKlOJYriyOoTeeQKtQ";

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude},${currentLocation.longitude}&radius=500&type=toilet&key=AIzaSyB5vkO74FzMb8CgWtKlOJYriyOoTeeQKtQ`
      );
      const data = await response.json();
      const toiletLocations = data.results.map((result) => ({
        title: result.name,
        description: result.vicinity,
        coordinate: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        },
      }));
      setToiletLocations(toiletLocations);
    }
    if (initialRegion) {
      fetchToiletLocations();
    }
  }, [initialRegion]);

  function handleToiletBtnClick() {
    setShowToilets(!showToilets);
  }

  //초기 지역설정이 되지 않은 시점에서는 아무 표시(마커) 않하게. (비동기처리)
  //로딩 설정
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  //markers 업데이트
  const user_marker_image = require("../assets/user_marker.png");

  const userMarker = {
    title: "My Location",
    description: "This is my current location",
    coordinate: {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    },
    image: user_marker_image,
  };

  const parks = [
    {
      name: "풍암저수지",
      latitude: 35,
      longitude: 126,
    },
    {
      name: "운천저수지",
      latitude: 33,
      longitude: 116,
    },
  ];

  const parkMarkers = [
    //주변에있는 공원 마커 database에서 추가.
    {
      title: "a",
      description: "X",
      coordinate: {
        latitude: 35.125,
        longitude: 126.875,
      },
    },
    {
      title: "공원 고정 2",
      description: "X",
      coordinate: {
        latitude: 35.126,
        longitude: 126.88,
      },
    },
    {
      title: "공원 고정 3",
      description: "X",
      coordinate: {
        latitude: 35.12,
        longitude: 126.885,
      },
    },
  ];

  const handleMarkerPress = (marker, index) => {
    setSelectedMarkerIndex(index);

    if (currentLocation && marker) {
      const R = 6371; // Earth's radius in km
      const lat1 = currentLocation.latitude;
      const lon1 = currentLocation.longitude;
      const lat2 = marker.coordinate.latitude;
      const lon2 = marker.coordinate.longitude;

      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      setDistanceToMarker(distance.toFixed(2) + " km");
    } else {
      setDistanceToMarker(null); // Reset distance when no marker is selected
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="화장실 표시" onPress={handleToiletBtnClick}></Button>
      {initialRegion && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          onRegionChangeComplete={(newRegion) => setViewport(newRegion)}
        >
          //사용자 마커
          <Marker
            key={"user-0"}
            coordinate={userMarker.coordinate}
            title={userMarker.title}
            image={userMarker.image}
            style={{
              width: 10,
              height: 10,
            }}
          />
          //공원 마커
          {parkMarkers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={
                marker.distance ? marker.distance : marker.description
              }
              style={{
                width: 10,
                height: 10,
              }}
              onPress={() => handleMarkerPress(marker, index)}
            />
          ))}
          {toiletLocations.map((toilet, index) => {
            if (!showToilets) {
              return null;
            }
            return (
              <Marker
                key={index}
                coordinate={toilet.coordinate}
                title={toilet.title}
                description={toilet.description}
              />
            );
          })}
        </MapView>
      )}
      {distanceToMarker && (
        <Text style={{ textAlign: "center", height: 50, fontSize: 30 }}>
          공원까지의 거리 : {distanceToMarker}
        </Text>
      )}
    </View>
  );
}

export default MainScreen;
