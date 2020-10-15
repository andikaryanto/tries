import React, { memo } from 'react'
import { IconButton, TouchableRipple } from 'react-native-paper';
import { TouchableNativeFeedback as TNF, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Center from '../Center';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Column from '../Column';
const ButtonIconRounded = memo(({icon, style, color, onPress, rippleColor,size, ...props}) => {
  

    const styles = StyleSheet.create({
        touchable : {
            borderRadius:15,
            width: 47,
            height: 47,
            justifyContent:"center",
            alignItems:"center",
            ...style,
        },
        center:{
            overflow:"hidden",
            borderRadius:15,
            width: 47,
            height: 47,
            justifyContent:"center",
            alignItems:"center",
            ...style,
        }
    });

    return <Column align="center" style={styles.center}>
        <TouchableNativeFeedback style={styles.touchable}
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(rippleColor, true)}
            >
                <Center align="center">
                    <Icon {...props} color={color} size={size} name={icon} ></Icon>
                </Center> 
        </TouchableNativeFeedback>
    </Column>
});

export default ButtonIconRounded;