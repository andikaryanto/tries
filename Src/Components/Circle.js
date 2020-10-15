import React, { memo } from 'react'
import { View } from 'react-native'
const Circle = memo(({ width, ...props }) => {

    
    let style = {
        flexDirection:"column",
        alignItems: "center",
        justifyContent: 'center',
        height:width,
        width:width,
        borderRadius:width / 2,
        ...props.style
    }
    return <View style ={style}>
        {props.children}
    </View>
})

export default Circle;