import React, { memo, useState, useEffect } from 'react';
import { getUsername, getPhoto } from '../../Storage/Users';
import Texts from '../../Components/Text'
import { set } from 'react-native-reanimated';
import { BASE_URL } from '../../Const/Api';
import { StyleSheet, TouchableWithoutFeedback, View, ImageBackground } from 'react-native';

const MyAvatar = memo(({style, onPress, ...props}) => {

    let styles = {
        ...allStyles.tinyLogo,
        ...style,
    }


    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        getPhoto()
        .then(photo => {
            console.log("avatar", photo);
            setPhoto(photo)
        })
    }, []);

    if(onPress){
        return <TouchableWithoutFeedback  {...props}  onPress={onPress} >
            <View>
                <ImageBackground
                    style={styles}
                    imageStyle={{ borderRadius: 15 }}
                    source={(photo == null || photo == "")  ? require('../../Assets/Img/blankphoto.png') : {uri:BASE_URL+photo}}
                    />
            </View>
      </TouchableWithoutFeedback>
    }
    
    return <View {...props} >
        <ImageBackground
            style={styles}
            imageStyle={{ borderRadius: 15 }}
            source={photo == null ? require('../../Assets/Img/blankphoto.jpg') : {uri:BASE_URL+photo}}
            />
        </View>
});
export default MyAvatar;

const allStyles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });