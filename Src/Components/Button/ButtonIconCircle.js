import React, { memo } from 'react'
import { IconButton, TouchableRipple } from 'react-native-paper';
import { View, TouchableNativeFeedback as TNF, StyleSheet } from 'react-native';
import Center from '../Center';
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Column from '../Column';
const ButtonIconCircle = memo(({size, icon, style, color, onPress, rippleColor, width, ...props}) => {
       

        const styles = StyleSheet.create({
            touchable : {
                borderRadius: width == undefined ? 32 : width ,
                width: width == undefined ? 48 : width,
                height: width == undefined ? 48 : width,
                justifyContent:"center",
                alignItems:"center",
            },
            center:{
                borderRadius: width == undefined ? 32 : width ,
                width: width == undefined ? 48 : width,
                height: width == undefined ? 48 : width,
                overflow:"hidden",
                ...style
            }
        });
        return <Column align="center" style={styles.center}>
            <TouchableNativeFeedback style={styles.touchable}
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(rippleColor, true)}>
                <Icon {...props} color={color} size={size} name={icon} ></Icon>
            </TouchableNativeFeedback>
        </Column> ;
})

export default ButtonIconCircle;