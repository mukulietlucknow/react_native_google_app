import React , {useEffect} from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector  , useDispatch} from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as actions from '../store/action/action';

const PlaceListScreen = (props) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);

  useEffect(() => {
    dispatch(actions.loadPlaces());
  } , [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemdata) => (
        <PlaceItem
          image={itemdata.item.imageUrl}
          title={itemdata.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail" , {placeTitle : itemdata.item.title , placeId : itemdata.item.id});
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

PlaceListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="add place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlaceListScreen;
