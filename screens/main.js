import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import parkMarkers from "../components/marker";
import parks from "../data/parks";

function MainScreen() {
  const navigation = useNavigation();
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

  const handleGoToUserLocation = () => {
    if (currentLocation) {
      // 현재 위치로 지도 중심 이동
      setViewport({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };
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
    title: "현재 위치",
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
            //여기서 모달 고정 제어
            setPopupVisible(true);
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                flex: 0.5,
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: "hidden",
              }}
            >
              {selectedPark && (
                <Image
                  source={{ uri: selectedPark.img }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0.6,
                  }}
                  resizeMode="cover"
                />
              )}
              <View style={styles.modal_fake}>
                <TouchableOpacity
                  style={styles.close_icon}
                  onPress={() => setPopupVisible(false)}
                >
                  <Icon name="times-circle" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.modal_info}>
                {selectedPark && (
                  <View>
                    <View style={styles.line_1}>
                      <Text style={styles.line_1_name}>
                        {selectedPark.name}
                      </Text>
                      {selectedPark.rate == null ? null : (
                        <Text style={styles.line_1_rate}>
                          <Icon name="star" size={20} color="#F2CA00" />
                          <Text style={{ color: "#487548" }}>
                            {selectedPark.rate}
                          </Text>
                        </Text>
                      )}
                      {/* 마커사이 거리 */}
                      {distanceToMarker && (
                        <Text style={{ fontWeight: "bold" }}>
                          {distanceToMarker}
                        </Text>
                      )}
                    </View>
                    <View style={styles.line_2}>
                      <Icon
                        name="map-marker"
                        size={20}
                        color="#487548"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={{ color: "#487548" }}>
                        {selectedPark.address}
                      </Text>
                    </View>
                    <View style={styles.line_3}>
                      <TouchableOpacity
                        onPress={() => {
                          // 예를 들어 웹 브라우저로 URL 열기 등을 구현합니다.
                          Linking.openURL(selectedPark.detail).catch((error) =>
                            console.error("An error occurred", error)
                          );
                        }}
                        style={styles.line_3}
                      >
                        <Icon
                          name="angle-double-right"
                          size={20}
                          color="#487548"
                          style={{ marginRight: 5 }}
                        />
                        <Text style={styles.hyperlinkText}>자세히</Text>
                      </TouchableOpacity>
                    </View>
                    {/* Add other park information as needed */}
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal_fake: {
    flex: 2,
  },

  close_icon: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 20,
  },

  modal_info: {
    flex: 1,
    backgroundColor: "white",
    padding: 30,
    opacity: 0.99,
    marginRight: 10,
    marginLeft: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    pointerEvents: "auto",
  },

  line_1: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 15, // 원하는 패딩 값 설정
    borderBottomWidth: 1,
    borderBottomColor: "#487548",
  },
  line_1_name: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 10,
    color: "#487548",
  },
  line_1_rate: {
    opacity: 1,
    marginRight: 10,
    fontWeight: "bold",
  },
  line_2: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
    paddingTop: 10, // 원하는 패딩 값 설정
    paddingBottom: 10, // 원하는 패딩 값 설정
    borderBottomWidth: 1,
    borderBottomColor: "#487548",
  },
  hyperlinkText: {
    color: "#487548",
    textDecorationLine: "none",
  },
  line_3: {
    marginTop: -7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MainScreen;
