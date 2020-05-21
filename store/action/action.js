import * as FileSystem from "expo-file-system";
import { insertPlace, fetchData } from "../../helpers/db";
import ENV from "../../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const results = await fetchData();
      dispatch({ type: SET_PLACES, places: results.rows._array });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );
    if (!response.ok) {
      throw new Error("sth went wrong in ok");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("sth went wrong in response");
    }
    const address = resData.results[0].formatted_address;
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbresult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log("action dispatching"+dbresult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbresult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
