import React from 'react';
import Stack from '../Stack';
import Texts from '../Text';
import { TextInput, StyleSheet, View } from 'react-native';
import Column from '../Column';
import { WHITE } from '../../Const/Colors';
class StackedLabel extends React.Component{

    render(){
        const {label, style, labelColor, ...props} = this.props;
        return <>
                <Texts style={{color:labelColor, ...styleAll.label}}>{label}</Texts>
                <TextInput underlineColorAndroid={labelColor} {...props} style={{color:style.color,borderColor:WHITE, borderWidth:1,...styleAll.input}}
                    // Inherit any props passed to it; e.g., multiline, numberOfLines below
                />
            </>
    }
}

export default StackedLabel;


const styleAll = StyleSheet.create({
    label : {
        left:3
    },
    input:{
        fontFamily:"ProductSansRegular",
        width:"100%",
        top:3
    }
})