import React , {useState , useEffect , useCallback} from 'react';
import {View , Text,StyleSheet , TouchableOpacity} from 'react-native';
import MapView , {Marker} from 'react-native-maps';


const MapScreen = (props) => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readonly = props.navigation.getParam('readonly');
    const [selectedLocation , setSelectedLocation] = useState(initialLocation);
    const mapRegion = {
        latitude : initialLocation ? initialLocation.lat : 37.7,
        longitude : initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta : 0.0922,
        longitudeDelta : 0.0421,

    }

    const selectLocationhandler = event => {
        if(readonly){
            return;
        }
        setSelectedLocation({
            lat : event.nativeEvent.coordinate.latitude,
            lng : event.nativeEvent.coordinate.longitude
        })
    }
    let markerCordinate;
    if(selectedLocation){
        markerCordinate = {
            latitude : selectedLocation.lat,
            longitude : selectedLocation.lng
        }
    }

    const savePickedLocation = useCallback(() => {
        if(!selectedLocation){
            return;
        }
        props.navigation.navigate('NewPlace' , {pickedLocation : selectedLocation});
    } , [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({saveLocation : savePickedLocation});
    } , [savePickedLocation]);


    return (
        <MapView region={mapRegion} style={styles.map} onPress={selectLocationhandler}>
            {markerCordinate && (<Marker title='picked location' coordinate={markerCordinate} ></Marker>)}
        </MapView>

    )
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation');
    const readonly = navData.navigation.getParam('readonly');
    if(readonly){
        return ;
    }
    return {
        headerRight : (<TouchableOpacity style={styles.headerButton} onPress={saveFn}>
            <Text style={styles.headerButtonText} >Save</Text>
            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    map :{
        flex : 1,
    },
    headerButton:{
        marginHorizontal : 20,

    },
    headerButtonText:{
        fontSize : 16,
        color : 'white',
        fontWeight : 'bold'
    }
});


export default MapScreen;