
import {Platform} from 'react-native';
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import PlacesListScreen from '../Screens/PlaceListScreen';
import PlaceDetailScreen from '../Screens/PlaceDetailScreen';
import NewplaceScreen from '../Screens/NewPlaceScreen';
import MapScreen from '../Screens/MapScreen';

import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator({
    Places : PlacesListScreen,
    PlaceDetail : PlaceDetailScreen,
    NewPlace : NewplaceScreen,
    Map : MapScreen
} , {
    defaultNavigationOptions:{
        headerStyle : {
            backgroundColor : Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor : Platform.OS === 'android' ? 'white' : Colors.primary 
    }
});


export default createAppContainer(PlacesNavigator);
