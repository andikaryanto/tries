import React from 'react'
import Foundation from '../Components/Foundation';

// import { Left, Body, Right, Button, Icon, Title, Text, Card, View } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import Row from '../Components/Row';
import Column from '../Components/Column';
import Box from '../Components/Box';
import { StyleSheet, ImageBackground } from 'react-native'
import Center from '../Components/Center';
import RoundedAvatar from '../Components/Avatar/RoundedAvatar';
import Avatar from '../Components/Avatar/Avatar';
import { MAIN_THIRD, LIGHT, MAIN } from '../Const/Colors';
import CardRounded from '../Components/Card/CardRounded';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import InputSearch from '../Components/Input/InputSearch';
import Header from '../Components/Header/Header';
class HomeScreen extends React.Component{
    get header() {
        return <Header transparent left={<Left >
            <Button >
                <Icon name='arrow-back' />
            </Button>
        </Left>}
        actions={<Right>
            <Button transparent>
                <Icon name='menu' />
            </Button>
        </Right>
    }>
    </Header>
            
            
    }
      
    render(){
        return null;
        return <Foundation style={{backgroundColor:LIGHT}}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" style="auto" hidden={false}/>
            <Box paddingLeft = {20} style={{top:40}}>
                <Column >
                    <Row style={{justifyContent: 'space-between', paddingRight:20}}>
                        <Column>
                            <Text style={styleAll.welcomeText}>Welcome</Text>
                            <Text style={styleAll.nameText}>Andik Aryanto</Text>
                        </Column>
                        {/* <Center>
                            <Button transparent >
                                <Icon name='cog' />
                            </Button>
                        </Center> */}
                        <Center align="flex-end">
                            <Avatar/>
                        </Center>
                    </Row>
                    <CardRounded style={{marginTop:20, backgroundColor:MAIN, marginRight:20}}>
                        <Text style={styleAll.searchText}>Search Fast</Text>
                        <Text style={styleAll.desc}>You can seacrh quickly for the job you want</Text>
                        <InputSearch
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        />
                    </CardRounded>
                    <Row style={{marginTop:15}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {category.map((e, i) => {
                                return <Button key={e} small bordered rounded light style={{marginRight:10}}>
                                <Text>{e}</Text>
                              </Button>
                            })}
                        </ScrollView>
                    </Row>
                    <Row style={{marginTop:15}}>
                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styleAll.dataCard}>
                            { data.map((e, i) => {
                                return <CardRounded style={styleAll.cardData} key={e.company+i} small bordered rounded light >
                                <Column>
                                    <Text style={{fontWeight:"700"}}>{e.company}</Text>

                                    <Text >{e.jobDesc}</Text>
                                </Column>
                              </CardRounded>
                            })}
                        </ScrollView>
                    </Row >
                </Column>
            </Box>
        </Foundation>
    }
}

export default HomeScreen;

const category = [
    "All", "For You","Popular", "Featured", "Most Wanted"
];

const data = [
    {
        company : "PT. Murni",
        jobDesc : "Business Analaystasdaasdasdasdasadsdsa"

    },
    {
        company : "PT. Murni",
        jobDesc : "Business Analayst"

    },
    {
        company : "PT. Murni",
        jobDesc : "Business Analayst"

    },
    {
        company : "PT. Murni",
        jobDesc : "Business Analayst"

    }
]

const styleAll = StyleSheet.create({
    welcomeText:{
        fontSize:18,
    },
    desc : {

        fontSize:15,
        color:"#fff"
    },
    searchText:{

        fontSize:25,
        color:"#fff"
    },
    nameText: {
        fontSize: 35,
        fontWeight: "500"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: 400, height: 400
    },
    dataCard : {
        marginRight:10,
        // width: "60%",
        // flexDirection: "row",
        flexGrow:1
    },
    cardData : {
        marginRight:10,
        // width: "60%"
    }
});