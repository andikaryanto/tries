import React, { memo } from 'react'
import { Button, TouchableRipple } from 'react-native-paper'
import { Dimensions, StyleSheet, TouchableNativeFeedback as TNF, View } from 'react-native';
import Center from '../Center';
import Texts from '../Text';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Column from '../Column';
import Row from '../Row';
import Icon from 'react-native-vector-icons/Entypo';
const ButtonBlock = memo(({style, paddingHorizontal, icon, children, rippleColor, height, onPress, fontSize, uppercase, fontWeight, fontColor,...props}) => {

        const styles = StyleSheet.create({
            center:{
                height:height,
                overflow:"hidden",
                width:"100%",
                ...style
            },
            touchable : {
                // ...style,
                width:"100%",
                height:height,
                justifyContent:"center",
                alignItems:"center",
                paddingHorizontal:paddingHorizontal
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
        return  <Column style={styles.center}>
            <TouchableNativeFeedback style={styles.touchable}
                onPress={onPress}
                background={TouchableNativeFeedback.Ripple(rippleColor, true)}
                
                    >
                        <Row style={{alignItems:"center", justifyContent:"center"}}>
                            {icon != undefined ? <Icon name={icon} color={fontColor}  size={20}>  </Icon> : null}
                            <Texts {...props} style={styles.text}>{toUppercase ? children.toUpperCase() : children}</Texts>
                        </Row>
            </TouchableNativeFeedback>
        </Column>;
    // }
})

export default ButtonBlock;