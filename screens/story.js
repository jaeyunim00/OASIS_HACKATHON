import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { ViewPager } from "@react-native-community/viewpager";

const { width } = Dimensions.get("window");

const pages = [
  { key: "page1", content: "Page 1 content" },
  { key: "page2", content: "Page 2 content" },
  { key: "page3", content: "Page 3 content" },
  // Add more pages here
];

function StoryScreen() {
  const renderPage = ({ item }) => (
    <View style={styles.pageContainer}>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <FlatList
      data={pages}
      horizontal
      pagingEnabled
      renderItem={renderPage}
      keyExtractor={(item) => item.key}
    />
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default StoryScreen;
