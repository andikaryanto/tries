import React from 'react'
// import { View, Button, Text, Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import Row from '../Row';
import { StyleSheet } from 'react-native'
import { MAIN_SECOND } from '../../Const/Colors';
import Center from '../Center';
class InputSearch extends React.Component{
    
    render(){
        return <Row style={styleAll.row}>
            <TextInput style={styleAll.input}></TextInput>
            <Center align="flex-end">
                {/* <Button transparent small rounded  style={styleAll.button}><Icon name='search'/></Button> */}
            </Center>
        </Row>
    }
}

export default InputSearch;



const styleAll = StyleSheet.create({
    row : {
        marginTop:20, 
        backgroundColor:"#fff", 
        padding:3, 
        borderRadius:15,
        justifyContent: 'space-between',
        height:40
    },
    button: {
        padding:0,
        borderRadius:10,
        // height:35,
        // width:35,
    },
    input:{
        height: 35, borderColor: 'gray',width:'80%'  
    }
});