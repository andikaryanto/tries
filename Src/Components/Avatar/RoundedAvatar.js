import React, { memo } from 'react'
import { StyleSheet, ImageBackground, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
// import { PROFILE } from '../../Const/Images';
const RoundedAvatar = memo(({style, onPress, ...props}) => {

        let styles = {
            ...allStyles.tinyLogo,
            ...style
        }



        if(onPress){
          return <TouchableWithoutFeedback  {...props}  onPress={onPress}>
<           View>
              <ImageBackground
                  style={styles}
                  imageStyle={{ borderRadius: 15 }}
                  source={require('../../Assets/Img/blankphoto.jpg')}
                  />
              </View>
          </TouchableWithoutFeedback>
        }
        
        return <View {...props} >
            <ImageBackground
                style={styles}
                imageStyle={{ borderRadius: 15 }}
                source={require('../../Assets/Img/profile.jpg')}
                >
              </ImageBackground>
            </View>
});
export default RoundedAvatar;

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