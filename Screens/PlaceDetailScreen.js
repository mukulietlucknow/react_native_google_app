import React from 'react';
import {View , Text,StyleSheet} from 'react-native';

const PlaceDetailScreen = (props) => {
    return (
        <View>
            <Text>Places List detail Screen</Text>
        </View>
    )
}

PlaceDetailScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('placeTitle');
    return{
        headerTitle : title,
    }
}

const styles = StyleSheet.create({

});


export default PlaceDetailScreen;