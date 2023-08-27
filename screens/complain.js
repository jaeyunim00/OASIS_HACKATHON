import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FirebaseStorage } from "firebase/storage";
import { db } from "../firebaseConfig";

function ComplainScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>민원</Text>
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

export default ComplainScreen;
