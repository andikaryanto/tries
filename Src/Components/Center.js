import React, { memo } from 'react'
import { View } from 'react-native'
const Center = memo(({ align, ...props }) => {

    
    let style = {
        flex: 1,
        flexDirection:"column",
        alignItems: "center",
        justifyContent: 'center',
        alignSelf:"center",
        ...props.style
    }
    return <View style ={style}>
        {props.children}
    </View>
})

export default Center;