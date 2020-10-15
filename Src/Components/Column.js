import React, { memo } from 'react'
import { View } from 'react-native';
const Column = memo(({ reverse, align, style, ...props }) => {

    let styles = {
        flexDirection: reverse ? "column-reverse" : "column",
        alignItems: align,
        // flexGrow:1,
        ...style
    }

    
    return <View style ={styles} {...props}>
        {props.children}
    </View>
})

export default Column;