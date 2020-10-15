import React, { memo } from 'react'
import { View } from 'react-native';
const Box  = memo(({ paddingLeft, paddingRight, paddingTop, paddingBottom, ...props }) => {
    
    let style= {
        paddingLeft : paddingLeft,
        paddingRight : paddingRight,
        paddingTop : paddingTop,
        paddingBottom : paddingBottom,
        flexDirection:"column",
        ...props.style
    }
    return <View style = {style}>
            {props.children}
        </View>
})

export default Box;