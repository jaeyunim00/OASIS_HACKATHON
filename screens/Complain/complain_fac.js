import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";

function Complain_fac() {
  const navigation = useNavigation();

  return (
    <View>
      {/* 버튼을 클릭하여 cctv 화면으로 이동 */}
      <View style={styles.navi}>
        <Button
          style={styles.navi_btn}
          title="시설보수"
          onPress={() => navigation.navigate("complain_fac")}
        />
        <Button
          style={styles.navi_btn}
          title="CCTV"
          onPress={() => navigation.navigate("cctv")}
        />
        <Button
          style={styles.navi_btn}
          title="우수 유저"
          onPress={() => navigation.navigate("best_user")}
        />
      </View>
      {/* 나머지 컴포넌트 내용 */}
    </View>
  );
}
const styles = StyleSheet.create({
  navi: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});

export default Complain_fac;
