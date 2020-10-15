import React, { memo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { withTheme} from 'react-native-paper';
const Texts  = memo(({ style, ...props }) => {

    let newStyle = {
        ...style,
        ...styleAll.style
    }
    return <Text {...props} style={newStyle}></Text>
    
})

export default withTheme(Texts);


const styleAll = StyleSheet.create({
    style : {
        fontFamily:"ProductSansRegular"
    }
});