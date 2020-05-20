import React from 'react';
import {View , Text,StyleSheet , Button , Image} from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';

const ImageSelector = () => {
    const takeImageHandler = () => {
        ImagePicker.launchCameraAsync();
    }
    return (
    <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            <Text>No Image picked yet</Text>
            <Image style={styles.image}/>
        </View>
        <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
    </View>
    )}

const styles = StyleSheet.create({
    imagePicker:{
        alignItems : 'center',
        marginBottom : 20,
    },
    image:{
        height : '100%',
        width : '100%'
    },
    imagePreview:{
        width : '100%',
        height : 200,
        marginBottom :10,
        justifyContent : 'center',
        alignItems : 'center',
        borderColor : '#ccc',
        borderWidth : 1,
    }
});


export default ImageSelector;