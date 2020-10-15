import React, { memo, useState } from 'react'
import Aux from '../../Components/Auxx';
import Foundation from '../../Components/Foundation';
import { StatusBar, View, ImageBackground, Image } from 'react-native';
import ContainerBox from '../../Components/Container/ContainerBox';
import { MAIN_FOURTH, MAIN, WHITE, GREY, LIGHT, MAIN_CONTRAST, MAIN_SECOND } from '../../Const/Colors';
import Texts from '../../Components/Text';
import Column from '../../Components/Column';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import StandartInput from '../../Components/Input/StandartInput';
import Row from '../../Components/Row';
import { Colors } from 'react-native-paper';
import Toast from '../../Components/Toast';
const ProjectCreateScreen = memo(({navigation, ...props}) => {

    const [form, setForm] = useState({projectName:"", isSubmited:false});

    const doCreate = () => {
        setForm({projectName:form.projectName, isSubmited:true})
        if(form.projectName != "")
            navigation.navigate('ProjectCreationScreen' , {projectName:form.projectName});
    }

    const onValueChange = (field, value) => {
        setForm({projectName:value, isSubmited:false});
    }

    return <Aux>
        <Foundation style={{backgroundColor:MAIN_FOURTH}} scrollable = {true}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
          
                <ImageBackground
                    style={{width:"100%", height:"55%", flexGrow:1}}
                    source={require('../../Assets/Img/project.png')}
                    
                    >
                    
                    <Column style = {{ paddingHorizontal:20, marginTop:450, justifyContent: 'center' }}>
                        <Texts numberOfLines={1} ellipsizeMode='tail' style={{paddingLeft:5,marginBottom:5, fontSize:40, color:WHITE}}>Getting Started</Texts>
                        <Column style={{width:"80%", marginBottom:5, paddingLeft:5}}>
                            <Texts style={{fontSize:17, color:MAIN}}>Welcome to Atmosphere, Atmosphere is mobile platform that can manage your team project. </Texts>
                            <Texts style={{marginTop:10, fontSize:17, color:MAIN}}>Base on SCRUM, manage your team to get the task done on Sprint </Texts>
                            <Texts style={{marginTop:10, fontSize:17, color:MAIN_CONTRAST}}>Fill the form bellow to start your project. </Texts>
                        </Column>
                        <Row style={{ justifyContent:"space-between", alignItems:"center", paddingVertical:5}}>
                            <StandartInput
                                placeholder={"Your Project Name Goes Here"}
                                placeholderTextColor={MAIN}
                                style={{marginRight:10, color:MAIN,paddingHorizontal:10, height: 40, backgroundColor:"rgba(0,0,0, 0.1)", borderRadius:20}}
                                onValueChange={onValueChange}
                                field={"Project"}
                                width={"80%"}
                                // errorStyle={{marginLeft:5, color:Colors.red500, fontSize:13}}
                                // errorText={form.projectName == "" && form.isSubmited ? "Project cant be empty" : ""}
                            />
                            <ButtonIconCircle rippleColor={MAIN} style={{backgroundColor:"rgba(0,0,0, 0.1)"}} icon={"rocket"} size={20} color={MAIN} onPress={doCreate}></ButtonIconCircle>
                        </Row>
                    </Column>
                </ImageBackground>
            {/* <Column style={{justifyContent:"space-between", flex:1}}> */}
                    {/* <ButtonIconCircle rippleColor={MAIN} style={{backgroundColor:"rgba(0,0,0, 0.1)"}} icon={"chevron-small-left"} size={30} color={MAIN} onPress={() => navigation.goBack()}></ButtonIconCircle> */}
                
            {/* </Column> */}
            <Toast visible={form.projectName == "" && form.isSubmited} message={"Project cant be empty"} />
        </Foundation>
    </Aux>
});

export default ProjectCreateScreen;