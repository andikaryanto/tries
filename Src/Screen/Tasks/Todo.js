import React, { memo, useRef, useState } from 'react'
import Column from '../../Components/Column';
import Row from '../../Components/Row';
import Circle from '../../Components/Circle';
import Texts from '../../Components/Text';
import Icon from 'react-native-vector-icons/Entypo';
import { ScrollView, Dimensions, TextInput } from 'react-native';
import CardRounded from '../../Components/Card/CardRounded';
import { MAIN, GREY, WHITE, MAIN_CONTRAST, WARNING, FONT, MAIN_FONT, MAIN_FOURTH, LIGHT, MAIN_SECOND, MAIN_THIRD } from '../../Const/Colors';
import Center from '../../Components/Center';
import ListAvatar from '../../Components/Avatar/ListAvatar';
import CardRectangle from '../../Components/Card/CardRectangle';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import RBSheet from "react-native-raw-bottom-sheet";
import ContainerBox from '../../Components/Container/ContainerBox';
const TodoScreen = memo(({ navigation }) => {

    const win = Dimensions.get("screen");
    const refRBSheet = useRef(null);

    const [reply, setReply] = useState("")

    const avatar = [
        require('../../Assets/Img/profile.jpg'),
        require('../../Assets/Img/profile.jpg'),
        require('../../Assets/Img/profile.jpg'),
    ];
    const data = [
        {
            date:"19/7",
            status:"In Progress",
            position:"#Pogrammer",
            task:"Entity ORM Fix",
            desc:"ORM got error child data, check relation data query or maybe get wrong id of primary key",
            comment:"2",
            attach:"3",
        },{
            date:"20/7",
            status:"New",
            position:"#Design",
            task:"Card Box Failure",
            desc:"Card In Master Data has zero padding, make it look like has little space in start",
            comment:"2",
            attach:"3",
        },{
            date:"19/7",
            status:"In Progress",
            position:"#Pogrammer",
            task:"Calculate money for debt position",
            desc:"Money sum in journal missmatch with total transaction value, check the stored procedure that producde the money calculate",
            comment:"2",
            attach:"3",
        },{
            date:"19/7",
            status:"In Progress",
            position:"#Pogrammer",
            task:"Entity ORM Fix",
            desc:"ORM got error child data, check relation data query or maybe get wrong id of primary key",
            comment:"2",
            attach:"3",
        },{
            date:"19/7",
            status:"In Progress",
            position:"#Pogrammer",
            task:"Entity ORM Fix",
            desc:"ORM got error child data, check relation data query or maybe get wrong id of primary key",
            comment:"2",
            attach:"3",
        },{
            date:"19/7",
            status:"In Progress",
            position:"#Pogrammer",
            task:"Entity ORM Fix",
            desc:"ORM got error child data, check relation data query or maybe get wrong id of primary key",
            comment:"2",
            attach:"3",
        },{
            date:"19/7",
            status:"In Progress",
            position:"#Pogrammer",
            task:"Entity ORM Fix",
            desc:"ORM got error child data, check relation data query or maybe get wrong id of primary key",
            comment:"2",
            attach:"3",
        },{
            date:"23/8",
            status:"In Progress",
            position:"#Pogrammer",
            task:"Entity ORM Fix",
            desc:"ORM got error child data, check relation data query or maybe get wrong id of primary key",
            comment:"2",
            attach:"3",
        },
    ];

    const listSelect = () => {
        // refRBSheet.current.open();
        navigation.navigate("TaskDetailScreen")
    }
    return <>
        <Column style={{justifyContent:"center",paddingTop:10,paddingHorizontal:10, flex:1, backgroundColor:WHITE}}>
        
            <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} style={{flex:1}} contentContainerStyle={{flexGrow: 1}}>
                {
                    data.map((e, i) => {
                        return <Row key ={e.task+i}>
                        
                            
                            <CardRectangle rippleColor={MAIN_FOURTH} style={{ flex:3,backgroundColor:WHITE, borderBottomColor: MAIN_FOURTH, borderBottomWidth: 0.5}} onPress = {listSelect}>
                                <Row style={{alignItems:"center", justifyContent: 'space-between', marginBottom:10}}>
                                    <Texts style={{color:e.status == "New" ? MAIN_CONTRAST : WARNING}}>{e.status}</Texts>
                                    <ButtonIconCircle icon={"dots-three-vertical"} width={32}>

                                    </ButtonIconCircle>
                                </Row>
                                <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:MAIN,fontSize:20, fontWeight:"500", marginBottom:5}}>{e.task}</Texts>
                                <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:FONT}}>{e.desc}</Texts>
                                
                                <Row style={{justifyContent: 'space-between', marginTop:10, marginRight:10}}>
                                    <Center  align="flex-start">
                                        <Row>
                                            
                                            <Icon size={15} name="message" />
                                            <Texts style={{marginRight:10}}>{e.comment}</Texts>
                                            <Icon size={15} name="attachment" />
                                            <Texts>{e.attach}</Texts>
                                        </Row>
                                    </Center>
                                    {/* <Row>
                                        
                                        <ListAvatar data = {avatar} style={{width:30, height:30}}/>
                                    </Row> */}
                                </Row>
                            </CardRectangle>
                        </Row>
                    })
                }
                
            </ScrollView>
        </Column>

        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            dragFromTopOnly={true}
            closeOnPressMask={false}
            customStyles={{
                container:{
                    backgroundColor:MAIN_THIRD,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15
                },
                wrapper: {
                    backgroundColor: "rgba(0,0,0, 0.4)"
                },
                draggableIcon: {
                    backgroundColor: LIGHT
                }
            }}
            height={win.height - 130}
        >
            <ContainerBox style={{paddingTop:10, paddingBottom:20,flex:1, paddingHorizontal:15,}}>
                <Texts style={{color:LIGHT, fontSize:40, fontWeight:"500"}}>Entity ORM Fix</Texts>
                <Texts style={{fontSize:15, color:MAIN}} >Sprint #43 . Q7 - 20</Texts>
                <ScrollView contentContainerStyle={{flexGrow: 1,marginTop:20, justifyContent: 'space-between'}} showsVerticalScrollIndicator={false}>
                    
                    <Texts style={{fontSize:17,color:LIGHT,marginRight:10}}>Money sum in journal missmatch with total transaction value, check the stored procedure that producde the money calculate</Texts>
                </ScrollView>
                
            
                <Row style={{height:80, paddingHorizontal:10,paddingVertical:10, justifyContent:"center", alignItems:"center"}}>

                    <TextInput
                        placeholder={"Enter Reply"}
                        placeholderTextColor={LIGHT}
                        style={{marginRight:10, color:LIGHT,paddingHorizontal:10, height: 40, backgroundColor:"rgba(0,0,0, 0.1)", width:"80%", borderRadius:20}}
                        onChangeText={reply => setReply(reply)}
                        value={reply}
                    />
                    <ButtonIconCircle rippleColor={MAIN} style={{backgroundColor:"rgba(0,0,0, 0.1)"}} icon={"rocket"} size={20} color={MAIN}></ButtonIconCircle>
                </Row>
            </ContainerBox>
        </RBSheet>
    </>
});

export default TodoScreen;