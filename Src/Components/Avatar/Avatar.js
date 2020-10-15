import React, { memo, useState } from 'react'
import { StyleSheet, TouchableHighlight, ImageBackground, View } from 'react-native'
// import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Column from '../Column';
import Texts from '../Text';
const Avatar = memo(({ source, containerStyle, ...props } ) => {

  let style = {
      ...styles.tinyLogo,
      ...props.style
  }
  return <View style={{...style, ...containerStyle}}>
      <ImageBackground
          style={style}
          imageStyle={{ borderRadius: 25 }}
          source={source}
          >
        </ImageBackground>
    </View>
})
export default Avatar;


const styles = StyleSheet.create({
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