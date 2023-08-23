import React from "react";
import { View, Text, Button } from "react-native";
import { uploadImage } from "../../firebaseConfig"; // 경로를 적절히 수정하세요

const UploadScreen = ({ route }) => {
  const { imageUri } = route.params;

  const handleUpload = async () => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const timestamp = Date.now();
      const fileName = `image_${timestamp}.jpg`;

      await uploadImage(blob, fileName);
      Alert.alert("Success", "Image uploaded successfully!");
      console.log("Image uploaded:", fileName);
    } catch (error) {
      Alert.alert("Error", "Image upload failed.");
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Upload Screen</Text>
      <Button title="Upload Image" onPress={handleUpload} />
    </View>
  );
};

export default UploadScreen;
