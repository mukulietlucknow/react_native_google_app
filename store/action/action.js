import * as FileSystem from "expo-file-system";
import { insertPlace , fetchData } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = 'SET_PLACES';

export const loadPlaces = () => {
    return async dispatch => {
        try{
            const results = await fetchData();
            console.log(results);
            dispatch({type : SET_PLACES , places :results.rows._array});
        }catch (err){
            console.log(err);
            throw err;
        }        
    }
}

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "dummy address",
        15.6,
        11.3
      );
      console.log(dbresult);
      dispatch({ type: ADD_PLACE, placeData: { id : dbresult.insertId,title: title, image: newPath } });
    } catch (err) {
      console.log(err);
      throw err;
    }    
  };
};
