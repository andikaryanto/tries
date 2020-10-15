import React, { memo } from 'react'
import { View } from 'native-base';
import Center from '../Center';
import { WHITE } from '../../Const/Colors';
const ContainerBoxRounded = memo(({ width, ...props }) => {
    
    let style= {
        borderRadius:width/2,
        width:width,
        height:width,
        flexDirection:"column",
        alignItems:"center",
        justifyContent: 'center',
        // padding:width/2,
        // height:width,
        ...props.style
    }
    return <View  style = {style}>
            {props.children}
        </View>
})

export default ContainerBoxRounded;