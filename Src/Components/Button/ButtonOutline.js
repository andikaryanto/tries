import React, { memo } from 'react'
import { Button, TouchableRipple } from 'react-native-paper'
import { Dimensions, StyleSheet } from 'react-native';
import Center from '../Center';
import Texts from '../Text';
import Column from '../Column';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
const ButtonOutline = memo(({style, borderColor, children, rippleColor, height, onPress, fontSize, uppercase, fontWeight, fontColor,...props}) => {

        const styles = StyleSheet.create({
            center:{
                height:height,
                overflow:"hidden",
                borderColor:borderColor,
                borderWidth:1,
                paddingHorizontal:0,
                borderRadius:style.borderRadius,
            },
            touchable : {
                ...style,
                borderRadius:style.borderRadius,
                paddingHorizontal:style.paddingHorizontal,
                height:height,
                justifyContent:"center",
                alignItems:"center",
            },
            text:{
                fontSize:fontSize,
                fontWeight:fontWeight,
                color:fontColor
            }
        });
        let toUppercase = true;
        if(uppercase != undefined && !uppercase){
            toUppercase = false;
        }
        return <Column style={styles.center}>
        <TouchableNativeFeedback style={styles.touchable}
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(rippleColor, true)}
                >
                    <Texts {...props} style={styles.text}>{toUppercase ? children.toUpperCase() : children}</Texts>
                    
        </TouchableNativeFeedback>
    </Column>;
    // }
})

export default ButtonOutline;