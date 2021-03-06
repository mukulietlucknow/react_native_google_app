import React, { useState,useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";
import {useDispatch} from 'react-redux';
import * as actions from '../store/action/action';
import ImagePicker from '../components/ImageSelector';
import LocationPicker from '../components/locationPicker';

const PlaceNewScreen = (props) => {
    const dispatch = useDispatch()
    const [selectedLocation , setSelectedLocation] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [pickedImage , setPickedImage] = useState(null);

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setPickedImage(imagePath);
  }

  const savePlaceHnadler = () => {
    dispatch(actions.addPlace(titleValue , pickedImage , selectedLocation));
    props.navigation.goBack();
  }

  const locationPickedhandler = useCallback(location => {
    setSelectedLocation(location)
  } , [setSelectedLocation]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImagetake={imageTakenHandler}/>
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedhandler}/>
        <Button color={Colors.primary} title="save place" onPress={savePlaceHnadler} />
      </View>
    </ScrollView>
  );
};

PlaceNewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Add New Place",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    marginBottom: 15,
    fontSize: 18,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default PlaceNewScreen;
