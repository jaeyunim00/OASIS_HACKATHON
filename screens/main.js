import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import parkMarkers from "../components/marker";

import parks from "../data/parks";

function MainScreen() {
  //초기위치설정(내 위치), 로딩관리
  const [initialRegion, setInitialRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  //실시간 내 위치
  const user_marker_image = require("../assets/user_marker.png");
  const [currentLocation, setCurrentLocation] = useState(null);

  //현재 화면 뷰포트
  const [viewPort, setViewport] = useState(null);

  //나와 마커사이의 거리
  const [distanceToMarker, setDistanceToMarker] = useState(null);

  //모달창
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const selectedPark = selectedMarker
    ? parks.find((park) => park.name === selectedMarker.title)
    : null;

  //초기위치설정, 로딩관리
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

  //이 위치는 useEffect가 끝난뒤 와야함.
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const userMarker = {
    title: "My Location",
    description: "This is my current location",
    coordinate: {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    },
    image: user_marker_image,
  };

  const handleMarkerPress = (marker) => {
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

    setSelectedMarker(marker);
    setPopupVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {distanceToMarker && (
        <Text style={{ textAlign: "center", height: 50, fontSize: 30 }}>
          공원까지의 거리 : {distanceToMarker}
        </Text>
      )}
      {initialRegion && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          onRegionChangeComplete={(newRegion) => setViewport(newRegion)}
        >
          {/* {사용자 마커} */}
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
          {/* {공원 마커} */}
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
              onPress={() => handleMarkerPress(marker)}
            />
          ))}
        </MapView>
      )}
      {/* Use Modal from React Native */}
      <Modal
        visible={isPopupVisible}
        animationType="slide" // Slide in from the bottom
        transparent={true}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setPopupVisible(false);
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={{ flex: 0.5, backgroundColor: "white", padding: 20 }}>
              {selectedPark && (
                <>
                  <Text>{selectedPark.name}</Text>
                  <Text>{selectedPark.type}</Text>
                  {/* Add other park information as needed */}
                  <TouchableOpacity onPress={() => setPopupVisible(false)}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default MainScreen;
