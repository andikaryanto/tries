import React, { memo } from 'react'
import { TextInput } from 'react-native-paper';
import Texts from "../../Components/Text"

const OutlinedInput = memo(({errorText, errorStyle, ...props}) => {
    return <>
        <TextInput mode="outlined" {...props}
        />
        {errorText != "" ? <Texts style={errorStyle}>{errorText}</Texts> : null}
    </>
});

export default OutlinedInput;