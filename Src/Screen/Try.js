import React, { memo, useState, useEffect  } from 'react'
import { Text, Animated } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';
import ButtonBlock from '../Components/Button/ButtonBlock';
import Center from '../Components/Center';
import Column from '../Components/Column';
import Row from '../Components/Row';
import Texts from '../Components/Text';
import { MAIN } from '../Const/Colors';

const TryScreen = memo(() => {

    const [animVal, setAnimVal] = useState(new Animated.Value(0));
    const [toggled, setToggled ] = useState(false);


    const expand = () => {
        if(!toggled){

            Animated.timing(
                animVal,
                {
                    toValue:1,
                    duration:300,
                    useNativeDriver:false
                }
            ).start();
        } else {
            Animated.timing(
                animVal,
                {
                    toValue:0,
                    duration:300,

                    useNativeDriver:false
                }
            ).start();
        }
        setToggled(!toggled);
    }


    return <>
       
        <Center>
            <Column>
                <Animated.View style={{backgroundColor:MAIN, height:animVal.interpolate(
                    {
                        inputRange:[0,1],
                        outputRange:[0,48]
                    }
                ), width:animVal.interpolate(
                    {
                        inputRange:[0,1],
                        outputRange:[48,100]
                    }
                ), overflow:"hidden", borderRadius:48}}
                        onPress={() => {}}
                        background={TouchableNativeFeedback.Ripple(MAIN, true)}
                        
                            >
                                <Row style={{alignItems:"center", justifyContent:"center"}}>
                                    
                                    <Texts>a</Texts>
                                    <Texts>a</Texts>
                                    <Texts>a</Texts>
                                    <Texts>a</Texts>
                                    <Texts>a</Texts>
                                    <Texts>a</Texts>
                                    <Texts>a</Texts>
                                    <Texts>a</Texts>
                                    <Texts>a</Texts>
                                </Row>
                    </Animated.View >
            </Column>
            <ButtonBlock onPress={() => {expand()}}>generate</ButtonBlock>
        </Center>
    </>
});

export default TryScreen;