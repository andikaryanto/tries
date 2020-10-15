import React, { memo, useEffect, useState } from 'react';
import { Animated } from 'react-native';

const Expandable = memo(({toggle, maxHeight, style,paddingVertical, paddingHorizontal, marginBottom, ...props}) => {
    const [animVal, setAnimVal] = useState(new Animated.Value(0));
    const [toggled, setToggled ] = useState(false);
    // const [verticalPadding, setVerticalPadding] = useState(paddingVertical);

    useEffect(() => {
        // setVerticalPadding(paddingVertical);
        if(toggled){
            Animated.timing(animVal,
                {
                    toValue:1,
                    duration:200,
                    useNativeDriver:false
                }
            ).start();
        } else {
            // setVerticalPadding(0);
            Animated.timing(
                animVal,
                {
                    toValue:0,
                    duration:200,
    
                    useNativeDriver:false
                }
            ).start();
        }
        setToggled(!toggled);
    },[toggle])

    return <Animated.View style={{
        ...style,
        overflow:"hidden",
        width:"100%",
        height:animVal.interpolate(
            {
                inputRange:[0,1],
                outputRange:[0,maxHeight]
            }
        ),
        marginBottom:animVal.interpolate(
            {
                inputRange:[0,1],
                outputRange:[0,marginBottom]
            }
        ),paddingVertical:animVal.interpolate(
            {
                inputRange:[0,1],
                outputRange:[0,paddingVertical]
            }
        ),
        paddingHorizontal:paddingHorizontal
    }} >
        {props.children}
    </Animated.View>;
});

export default Expandable;
