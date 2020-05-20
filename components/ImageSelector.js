import React , {useState} from "react";
import { View, Text, StyleSheet, Button, Image, Alert, ImagePropTypes } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageSelector = (props) => {

    const [pickedImage , setPickedImage] = useState();



  const verifyPermissions = async (props) => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== "granted") {
      Alert.alert("Alert", "need suffecient permissions", [{ text: "okay" }]);
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions){
        return;
    }
    const image = await ImagePicker.launchCameraAsync({
        allowsEditing : true,
        aspect : [16,9],
        quality : .5,
    });
    setPickedImage(image.uri);
    props.onImagetake(image.uri);
    


  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage  ? <Text>No Image picked yet</Text> : <Image source={{uri : pickedImage}} style={styles.image} />}        
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default ImageSelector;
