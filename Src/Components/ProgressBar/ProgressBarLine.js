import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Center from '../Center';
import Column from '../Column';

const ProgressBarLine = memo(({percentage, color, thick, ...props}) =>{

    let styles = StyleSheet.create({
        progress : {
            backgroundColor:color,
            width:percentage.toString() + "%",
            height:thick,
            borderRadius:10,
            // marginBottom:-1 * (thick / 2),
            // zIndex:1
        }
    })

    return <View style={styles.progress}>
        <Center>
            {/* {props.children} */}
            {/* <Text>asdasdasd</Text> */}
        </Center>
    </View>
}) ;

export default ProgressBarLine;