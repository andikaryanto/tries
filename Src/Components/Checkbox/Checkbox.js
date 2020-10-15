import React, { memo, useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { MAIN, GREY, WHITE } from '../../Const/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Texts from '../Text';
import Row from '../Row';

const Checkbox = memo(({isChecked, width, checkedColor, item, onValueChange, style, text, textColor,  ...prop}) => {

    const [selected, setSelected] = useState(isChecked);

    const styles = StyleSheet.create({
        check:{
            // borderColor:GREY,
            borderWidth: selected ? 0 :2,
            borderRadius:3
        }
    })

    let newStyle = {
        ...styles.check,
        width: width != undefined ? width : 20,
        height: width != undefined ? width : 20,
        borderColor: selected ? (checkedColor == undefined ? MAIN : "") : GREY,
        backgroundColor:selected ? (checkedColor == undefined ? MAIN : checkedColor) : "transparent",
        alignItems:"center",
        justifyContent:"center",
        marginRight: text!= undefined ? 2 : 0,
        ...style
    }

    useEffect(() =>{
        // setSelected(isChecked);
    }, [isChecked]);


    const onPress = () => {
        onValueChange(item, !selected);
        setSelected(!selected);   
    }

    return <Row style={{alignItems:"center", marginRight:10}}>
        <TouchableOpacity style={newStyle} onPress={onPress}>
            {selected ? <Icon name={"check"} color={WHITE} size={15}></Icon> : null}
        </TouchableOpacity>
        { text != undefined ? <Texts style={{color:textColor}}>{text}</Texts> : null}
    </Row>
});



export default Checkbox;