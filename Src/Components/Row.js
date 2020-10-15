import React, { memo } from 'react'
import { View } from 'react-native'
const Row = memo(({ reverse, style,  ...props }) => {


    let styles = {
        flexDirection: reverse ? "row-reverse" : "row",
        ...style
    }
    return <View style ={styles} {...props}>
        {props.children}
    </View>
})

export default Row;