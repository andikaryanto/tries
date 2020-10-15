import React, { memo } from 'react'
import { View, TouchableNativeFeedback as TNF } from 'react-native'
import { TouchableRipple } from 'react-native-paper';
import { MAIN_FOURTH, MAIN_CONTRAST, LIGHT, GREY } from '../../Const/Colors';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
const CardRounded = memo(({onPress, touched, rippleColor, padding, ...props}) => {

    let style = {
        backgroundColor:"#fff",
        borderRadius:15,
        overflow: 'hidden',
        // flexDirection:"column",
        ...props.style
    }

    let paddingContent = padding != undefined ? padding : 15;
    // let a = TouchableNativeFeedback.
    let children = null;
    if(onPress){
        children =   <TouchableNativeFeedback containerStyle={{borderRadius:15, paddingVertical:paddingContent, paddingHorizontal:paddingContent}}
                                        delayPressIn={100}
                                        onPress={onPress}
                                        background={TouchableNativeFeedback.Ripple(rippleColor, true)}
                                        
                                    >
                                        <>
                                            {props.children}
                                        </>
                </TouchableNativeFeedback>
    
    } else {
        style = {
            ...style,
            paddingVertical:paddingContent, 
            paddingHorizontal:paddingContent
        }
        children = props.children;
    }
    // return children;
    return <View style ={style}>
        {children}
    </View>
})

export default CardRounded;