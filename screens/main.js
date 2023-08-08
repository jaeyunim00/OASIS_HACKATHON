import React, { useEffect, useState } from "react";

import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

function MainScreen() {
  const [initialRegion, setInitialRegion] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    }
    fetchInitialLocation();
  }, []);

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

  //주변에있는 공원 마커 database에서 추가.
  const markers = [
    {
      title: "My Location",
      description: "This is my current location",
      coordinate: {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      },
    },
    {
      title: "Marker 2",
      description: "This is marker 2",
      coordinate: {
        latitude: initialRegion.latitude + 0.01,
        longitude: initialRegion.longitude + 0.01,
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {initialRegion && (
        <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

export default MainScreen;
