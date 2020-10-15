import React, { memo } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'
import { MAIN } from '../Const/Colors'
const Dot = memo(({...props}) => {

    let style = {
        borderRadius: 15 / 2,
        borderColor:"#fff",
        borderWidth:1,
        // paddingRight:2.5,
        // height:10,
        width:15,
        // flexDirection:"column",
        ...props.style
    }
    return <View style ={style}>
        {props.children}
    </View>
})

export default Dot;