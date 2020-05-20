import React from 'react';
import {View , Text,StyleSheet, Platform} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const PlaceListScreen = (props) => {
    return (
        <View>
            <Text>Places List Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({

});

PlaceListScreen.navigationOptions = navData => {
    return{
        headerTitle : 'All Places',
        headerRight : <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='add place' iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}  onPress={() => {
                navData.navigation.navigate('NewPlace');
            }}/>
        </HeaderButtons>
    }
}


export default PlaceListScreen;