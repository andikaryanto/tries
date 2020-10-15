import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native';
import Texts from "../../Components/Text"
import Column from '../Column';
import Row from '../Row';
// import { TextInput } from 'react-native-paper';


const StandartInput = memo(({ value, errorText, width, errorStyle, style, field, onValueChange, append, ...props}) => {

    const [values, setValue] = useState(value);

    const changeValue = (value) => {
        onValueChange(field, value);
        setValue(value);
    }

    return <Column style={{width:width,...style}}>
        <Row style={{alignItems:"center", justifyContent:"space-between"}}>
            <TextInput {...props} value={values} onChangeText={changeValue} style={{ ...styleAll.style, width:append == undefined ? "100%" : "80%"}}/>
            {append}
        </Row>
        {(errorText != "" && errorText != undefined) ? <Texts style={errorStyle}>{errorText}</Texts> : null}
    </Column>

})

const styleAll = StyleSheet.create({
    style : {
        fontFamily:"ProductSansRegular"
}
});

export default StandartInput;