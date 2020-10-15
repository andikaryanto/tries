import React, { memo, useRef, useState } from 'react'
import { View , TouchableNativeFeedback as TNF, PanResponder} from 'react-native'
import { TouchableRipple } from 'react-native-paper';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { GREY } from '../../Const/Colors';
const CardRectangle = memo(({onPress, rippleColor, style,onLongPress, padding, ...props}) => {

    const [canPress, setCanPress] = useState(true);
    
    let styles = {
        backgroundColor:"#fff",
        overflow: 'hidden',
        ...style
    }

    // const retentionOffset = {
    //     top:10,
    //     bottom:10,
    //     right:10,
    //     left:10
    // }

    let paddingContent = padding != undefined ? padding : 15;

    let children = null;
    if(onPress){
        children =  <TouchableNativeFeedback containerStyle={{borderRadius:10, 
                                                                paddingVertical:paddingContent, 
                                                                paddingHorizontal:paddingContent}}
                            // delayPressIn={100}
                            // pressRetentionOffset={{retentionOffset}}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            background={TouchableNativeFeedback.Ripple(rippleColor, true)}
                            
                    >
                        <>
                            {props.children}
                        </>
                    </TouchableNativeFeedback>
    
    } else {
        styles = {
            ...styles,
            paddingVertical:paddingContent, 
            paddingHorizontal:paddingContent
        }
        children = props.children;
    }


    return <View {...props}
    style ={styles}>
        {children}
    </View>
})

export default CardRectangle;