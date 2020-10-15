import React from 'react'
import Foundation from '../../Components/Foundation';
import {Header, Left, Button, Icon, Right, Text, Form, Item, Input, View } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import Row from '../../Components/Row';
import Column from '../../Components/Column';
import Box from '../../Components/Box';
import { StyleSheet, TextInput } from "react-native";
class AuthScreen extends React.Component{

    get header() {
        return <Header transparent>
           <Right>

                <Row reverse={true}>
                    <Button light><Text>aaaaa</Text></Button>
                    <Button><Text>aaaaa</Text></Button>

                </Row>
           </Right>
        </Header>
    }

    render(){
        

        return <Foundation header={this.header}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" style="auto" hidden={false}/>
            <Column style={
                {
                    top:50,
                    flex: 1
                }
            }> 
                <Box padding={35}>
                    <Text style={titleStyle.titleText}>Welcome Back, </Text>
                    <Text style={titleStyle.subtitleText}>Please Login </Text>
                    <View style ={{top:40}}>
                        <Form>
                            <Item>
                                <Input placeholder="Username" />
                            </Item>
                            <Item last>
                                <Input placeholder="Password" />
                            </Item>
                        </Form>
                    </View>
                </Box>
            </Column>
        </Foundation>
    }
}
export default AuthScreen;

const titleStyle = StyleSheet.create({
  
    titleText: {
      fontSize: 40,
      fontWeight: "normal"
    },
    subtitleText: {
        fontSize: 35,
        fontWeight: "700"
      }
  });