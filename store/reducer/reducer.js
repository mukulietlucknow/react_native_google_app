import { ADD_PLACE } from "../action/action";
import Place from '../../model/place';

const initialState = {
    places : []
}

export default (state = initialState , actions) => {
    switch(actions.type){
        case ADD_PLACE:
            const newPlace = new Place(new Date().toString() , actions.placeData.title);
            console.log(actions.placeData.title);
            return{
                places : state.places.concat(newPlace)
            }
        default:
            return state;

    }
}