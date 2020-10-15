import React, { memo } from 'react'
import { View } from 'native-base';
const ContainerBox  = memo(({paddingLeft, paddingRight, paddingTop, paddingBottom, ...props}) =>{
    
    // render(){
        // const {paddingLeft, paddingRight, paddingTop, paddingBottom} = this.props
        let style = {
            paddingLeft : paddingLeft,
            paddingRight : paddingRight,
            paddingTop : paddingTop,
            paddingBottom : paddingBottom,
            flexDirection:"column",
            // height:"100%",
            // flexGrow:1,
            ...props.style
        }
        return <View style = {style}>
                {props.children}
            </View>
    // }
});

export default ContainerBox;