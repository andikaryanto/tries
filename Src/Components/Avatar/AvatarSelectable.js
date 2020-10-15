import React, { memo, useState, useEffect } from 'react'
import { StyleSheet, TouchableHighlight, ImageBackground } from 'react-native'
// import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Column from '../Column';
import Texts from '../Text';
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import { WHITE, MAIN_CONTRAST, LIGHT } from '../../Const/Colors';
import Center from '../Center';
const AvatarSelectable = memo(({ source, selected, containerStyle, onSelect, data, ...props } ) => {

  const [selectedData, setSelect] = useState(selected);

  let style = {
      ...styles.tinyLogo,
      ...props.style
  }

  const onPress = (a) => {
    setSelect(!selectedData);
    onSelect(data, !selectedData);
  }

  useEffect(() => {
        setSelect(selected);
  }, [selected])
  return <TouchableHighlight style={{...containerStyle, borderRadius: 25, ...styles.tinyLogo}} onPress={onPress}>
      <ImageBackground
          style={style}
          imageStyle={{ borderRadius: 25 }}
          source={source}
        >
          {(selectedData) ? <Center style={{...style, borderRadius: 25, backgroundColor:"rgba(0,0,0, 0.5)"}}>
              <Icon name={"check"} size={24} color={LIGHT}/>
          </Center> : null}
        </ImageBackground>
    </TouchableHighlight>
})
export default AvatarSelectable;


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