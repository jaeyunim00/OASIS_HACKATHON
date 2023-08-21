import React, { useState } from "react";
import { View, Text, Button } from "react-native";

function Page1() {
  return (
    <View>
      <Text>로그인페이지</Text>
    </View>
  );
}

function Page2() {
  return (
    <View>
      <Text>마이페이지</Text>
    </View>
  );
}

function StoryScreen() {
  const [showPage1, setShowPage1] = useState(true);

  const togglePage = () => {
    setShowPage1(!showPage1);
  };

  return (
    <View>
      {showPage1 ? <Page1 /> : <Page2 />}
      <Button title="Toggle Page" onPress={togglePage} />
    </View>
  );
}

export default StoryScreen;
