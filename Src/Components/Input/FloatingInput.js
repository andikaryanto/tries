import React, { memo } from 'react'
import { TextInput } from 'react-native-paper';
import Texts from "../../Components/Text"

const FloatingInput = memo(({errorText, errorStyle, ...props}) => {
    return <>
        <TextInput {...props}
        />
        {errorText != "" ? <Texts style={errorStyle}>{errorText}</Texts> : null}
    </>
});

export default FloatingInput;