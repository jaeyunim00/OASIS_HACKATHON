import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function FacilityScreen() {
  const navigation = useNavigation();

  const facilities = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.page}>
      <Text style={styles.title}>공원 주변 시설</Text>
      <ScrollView style={styles.list}>
        {facilities.map((x) => {
          return (
            <View style={styles.item}>
              <Text style={styles.item_image}>시설{x}</Text>
              <View style={styles.item_detail}>
                <Text>시설이름{x}</Text>
                <Text>시설정보{x}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "yellow",
    padding: 10,
  },
  title: {
    marginTop: 40,
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    backgroundColor: "white",
    flex: 1,
  },
  item: {
    backgroundColor: "orange",
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  item_image: {
    backgroundColor: "gray",
    padding: 20,
    marginRight: 20,
  },
  item_detail: {},
});

export default FacilityScreen;
