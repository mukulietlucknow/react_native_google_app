import { ADD_PLACE, SET_PLACES } from "../action/action";
import Place from "../../model/place";

const initialState = {
  places: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_PLACE:
        
      const newPlace = new Place(
        actions.placeData.id.toString(),
        actions.placeData.title,
        actions.placeData.image,
      );
      case SET_PLACES:
        return{
          places : actions.places.map((pl) => new Place(pl.id.toString() ,pl.title , pl.imageUrl ))
        }
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
