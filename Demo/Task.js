import React, { memo } from 'react';
import Foundation from '../Src/Components/Foundation';
import {  MAIN, GREY, MAIN_CONTRAST, WHITE, MAIN_THIRD, MAIN_SECOND } from '../Src/Const/Colors';
import Texts from '../Src/Components/Text';
import Header from '../Src/Components/Header/Header';
import { ScrollView, StatusBar } from 'react-native';
// import { Icon, Button } from 'native-base';
import Row from '../Src/Components/Row';
import Center from '../Src/Components/Center';
import Column from '../Src/Components/Column';
import ContainerBox from '../Src/Components/Container/ContainerBox';
import ButtonIconCircle from '../Src/Components/Button/ButtonIconCircle';
import { TextInput, ProgressBar } from 'react-native-paper';
import ListAvatar from '../Src/Components/Avatar/ListAvatar';
import ButtonBlock from '../Src/Components/Button/ButtonBlock';
import Footer from '../Src/Components/Footer/Footer';
import { Colors } from 'react-native-paper';
import Aux from '../Src/Components/Auxx';
import ButtonSelect from '../Src/Components/Button/ButtonSelect';

const TaskScreen = memo(({ navigation, ...props }) => {
    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('transitionEnd', (e) => {
    //       // Do something
    //       console.log("start");
    //     });
      
    //     return unsubscribe;
    //   }, [navigation]);
    const log = (params) => (e) => {
        console.log(params)
    }   
   
    let form = {
        task : {
            text:"Task",
            value : "",
        },
        description : {
            text:"Description",
            value : "",
        },
        date : {
            text:"Date",
            value : "",
        }
    };

    let category = [
        {
            selected:true,
            text:"Programmer"
        },{
            selected:false,
            text:"Design"
        },{
            selected:false,
            text:"Front End"
        },{
            selected:false,
            text:"Else"
        },
        
    ];

    const onInputChange = (form) => (value) => {
        form[form].value = value;
        // setState({});
    }

    let header = <Header style={{backgroundColor:MAIN}}
                left={<ButtonIconCircle rippleColor="rgba(225,225,225, .5)" color={GREY} icon = {"chevron-small-left"} size={24} style={{ marginRight:5}} onPress={() => navigation.goBack()}>
                </ButtonIconCircle>}
                title={<Texts style={{color:GREY, fontSize:20}}>Create New Task</Texts>}
                actions={<>
                    {/* <ButtonIconCircle  color={GREY} icon="content-save-outline">
                    </ButtonIconCircle> */}
                </>}
            />;
    

    let footer = <Footer backgroundColor={WHITE} style={{padding:10}}>

            <ButtonBlock mode="contained" color={MAIN_CONTRAST} style = {{borderRadius:20}} onPress={log("footer")}>
                Create Task
            </ButtonBlock>

            <ButtonBlock fontColor={WHITE} fontWeight={"700"} height={50} fontSize={20} rippleColor="rgba(118,188, 188)" onPress={() => console.log("")} color={MAIN_SECOND} uppercase={false} style={{backgroundColor:MAIN_CONTRAST , borderRadius:30}}>Create Task</ButtonBlock>

        </Footer>;
    

    let avatar = [
        require('../Src/Assets/Img/profile.jpg'),
        require('../Src/Assets/Img/profile.jpg'),
        require('../Src/Assets/Img/profile.jpg'),
    ];
    
    return <Aux>
            <Foundation header={header} footer = {footer} style={{backgroundColor:MAIN}} scrollable = {true}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
               
                        <Column style={{ paddingHorizontal:20}}>
                            <TextInput underlineColor={GREY} style = {{backgroundColor:"transparent"}}
                                key={form.task.text}
                                label={form.task.text}
                                value={form.task.value}
                                onChangeText={onInputChange("task")}
                            />
                            <TextInput underlineColor={GREY} style = {{backgroundColor:"transparent"}}
                                key={form.date.text}
                                label={form.date.text}
                                value={form.date.value}
                                onChangeText={onInputChange("date")}
                            />
                            <Texts style={{marginTop:15, color:GREY}}>Assign To</Texts>
                            <ListAvatar data = {avatar} style={{paddingTop:20, paddingLeft:20}} addButton={true}/>
                            
                            <Texts style={{marginTop:15 , color:GREY}}>Category</Texts>
                            
                        </Column>
                        <Column >
                        
                            <ScrollView style={{marginTop:15}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <ButtonSelect mode="contained" data={category} selectedColor = {MAIN_CONTRAST} unselectedColor={MAIN_SECOND}/>
                            </ScrollView>
                        </Column>
                        
                        <ContainerBox style={{flex:1, paddingTop:10, paddingBottom:5, marginTop:15, paddingHorizontal:20, backgroundColor:WHITE, borderTopLeftRadius:20, borderTopRightRadius:20}}> 
                            <Column > 
                                <Row>
                                    <TextInput underlineColor={GREY} style = {{ flex:4, backgroundColor:"transparent"}}
                                    key={form.description.text}
                                    label={form.description.text}
                                    value={form.description.value}
                                    onChangeText={onInputChange("description")}
                                />
                                <Center style={{flex:1}} align="flex-end">
                                        <ButtonIconCircle rippleColor={MAIN} color={GREY} size={24} icon="paperclip" onPress={log("footer")} >
                                        </ButtonIconCircle>
                                    </Center>
                                </Row>
                            </Column>
                            <Row style={{marginTop:15, justifyContent: 'space-between'}}>
                                <Texts style={{ color:GREY}}>Attachment</Texts>
                                <Texts style={{ color:MAIN_CONTRAST}}> Show All</Texts>
                            </Row>
                            {/* <ScrollView contentContainerStyle={{flex:1}} nestedScrollEnabled = {true}> */}
                                <Row style={{marginTop:10}}>
                                    <Column style={{flex:4, marginLeft:10}}>
                                        <Texts style={{marginBottom:10}}> Refrences_1.docx</Texts>
                                        <ProgressBar progress={0.5} color={MAIN_THIRD} />
                                    </Column>
                                    <Column style={{flex:1, justifyContent:"center"}} align="center">
                                        <ButtonIconCircle rippleColor={Colors.red500} color={Colors.red500} size={24} icon="close" onPress={log("footer")} >
                                        </ButtonIconCircle>
                                    </Column>
                                </Row>
                                {/* <Row style={{marginTop:10}}>
                                    <Column style={{flex:4, marginLeft:10}}>
                                        <Texts style={{marginBottom:10}}> Refrences_1.docx</Texts>
                                        <ProgressBar progress={0.5} color={MAIN_THIRD} />
                                    </Column>
                                    <Column style={{flex:1, justifyContent:"center"}} align="center">
                                        <ButtonIconCircle rippleColor={Colors.red500} color={Colors.red500} size={24} icon="close" onPress={log("footer")} >
                                        </ButtonIconCircle>
                                    </Column>
                                </Row>
                                <Row style={{marginTop:10}}>
                                    <Column style={{flex:4, marginLeft:10}}>
                                        <Texts style={{marginBottom:10}}> Refrences_1.docx</Texts>
                                        <ProgressBar progress={0.5} color={MAIN_THIRD} />
                                    </Column>
                                    <Column style={{flex:1, justifyContent:"center"}} align="center">
                                        <ButtonIconCircle rippleColor={Colors.red500} color={Colors.red500} size={24} icon="close" onPress={log("footer")} >
                                        </ButtonIconCircle>
                                    </Column>
                                </Row>
                                <Row style={{marginTop:10}}>
                                    <Column style={{flex:4, marginLeft:10}}>
                                        <Texts style={{marginBottom:10}}> Refrences_1.docx</Texts>
                                        <ProgressBar progress={0.5} color={MAIN_THIRD} />
                                    </Column>
                                    <Column style={{flex:1, justifyContent:"center"}} align="center">
                                        <ButtonIconCircle rippleColor={Colors.red500} color={Colors.red500} size={24} icon="close" onPress={log("footer")} >
                                        </ButtonIconCircle>
                                    </Column>
                                </Row>
                                <Row style={{marginTop:10}}>
                                    <Column style={{flex:4, marginLeft:10}}>
                                        <Texts style={{marginBottom:10}}> Refrences_1.docx</Texts>
                                        <ProgressBar progress={0.5} color={MAIN_THIRD} />
                                    </Column>
                                    <Column style={{flex:1, justifyContent:"center"}} align="center">
                                        <ButtonIconCircle rippleColor={Colors.red500} color={Colors.red500} size={24} icon="close" onPress={log("footer")} >
                                        </ButtonIconCircle>
                                    </Column>
                                </Row>
                                <Row style={{marginTop:10}}>
                                    <Column style={{flex:4, marginLeft:10}}>
                                        <Texts style={{marginBottom:10}}> Refrences_1.docx</Texts>
                                        <ProgressBar progress={0.5} color={MAIN_THIRD} />
                                    </Column>
                                    <Column style={{flex:1, justifyContent:"center"}} align="center">
                                        <ButtonIconCircle rippleColor={Colors.red500} color={Colors.red500} size={24} icon="close" onPress={log("footer")} >
                                        </ButtonIconCircle>
                                    </Column>
                                </Row> */}
                        {/* </ScrollView> */}
                        
                    </ContainerBox>
            </Foundation>
        </Aux>;
});

export default TaskScreen;