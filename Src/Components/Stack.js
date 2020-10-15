import React, { memo } from 'react'
import { View } from 'react-native'
import Column from './Column';
const Stack = memo(({children, ...props}) => {

    var child = [];
    if(children != undefined)
        if(children.length > 1)
            child = children.map((e, i) => {
                let newChild = React.cloneElement(e, {style: {...e.props.style}});
                return <View style={{...e.props.stackStyle, position:"absolute"}}>{newChild}</View>
            });
        else {
            let newChild = React.cloneElement(children, {style: {...children.props.style}});
            child.push(<View style={{height: children.props.stackStyle, position:"absolute"}}>{newChild}</View>)
        }
    return <View style={{flex:1}}>{child}</View>
    return <Column>
        {child}
    </Column>
});

export default Stack;