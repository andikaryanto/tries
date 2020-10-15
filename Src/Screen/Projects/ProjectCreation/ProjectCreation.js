import React, { memo, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Aux from '../../../Components/Auxx';
import Foundation from '../../../Components/Foundation';
import ContainerBox from '../../../Components/Container/ContainerBox';
import Texts from '../../../Components/Text';
import { MAIN_FOURTH, MAIN, MAIN_CONTRAST, WHITE, LIGHT, MAIN_THIRD, GREY, MAIN_SECOND } from '../../../Const/Colors';
import { StatusBar, Dimensions } from 'react-native';
import Column from '../../../Components/Column';
import CalendarStraight from '../../../Components/Calendar/CalendarStraight';
import Row from '../../../Components/Row';
import ButtonBlock from '../../../Components/Button/ButtonBlock';
import CalendarFull from '../../../Components/Calendar/CalendarFull';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import ButtonIconRounded from '../../../Components/Button/ButtonIconRounded';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import StandartInput from '../../../Components/Input/StandartInput';
import { postData } from '../../../Selectors/Screen';
import { CREATE_PROJECTS, BASE_URL } from '../../../Const/Api';
import { screenLoading, screenLoaded } from '../../../Actions/Screen';
import ProjectTeamCreation from './ProjectTeamCreation';
import Avatar from '../../../Components/Avatar/Avatar';
import MyFoundation from '../../Components/MyFoundation';
import { showScreenLoader, hideScreenLoader } from '../../../Components/Loader/ScreenLoader';
import Snackbar from 'react-native-snackbar';
import OutlinedInput from '../../../Components/Input/OutlinedInput';


const ProjectCreationScreen = memo(({navigation, route, screen, dispatch}) => {
    const { projectName } = route.params;

    let controller = new AbortController();

    const refRBSheet = useRef(null);
    const win = Dimensions.get("screen");

    // variable 

    let today = new Date();
    let form = {
        Name:projectName,
        Description:"",
        StartDate:null,
        EndDate:null,
        Teams:[],
        Status:1
    };
    
    const onStartDateSelect = (date) => {
        let newDate = date;
        setForm("StartDate", newDate.getFullYear().toString() +"-"+(newDate.getMonth() + 1).toString() +"-"+(newDate.getDate() - 1).toString());
    }

    const onEndDateSelect = (date) => {
        let newDate =  date;
        setForm("EndDate", newDate.getFullYear().toString() +"-"+(newDate.getMonth() + 1).toString() +"-"+(newDate.getDate()-1).toString());
    }

    const onSave = () => {
        
        form.Teams = team();
        showScreenLoader("Saving");
        
        postData(CREATE_PROJECTS, controller, form, {}
        ).then(res => {
            hideScreenLoader();
            navigation.reset({
                index:0,
                routes: [{ name: 'ProjectsScreen' }],
            });
        }).catch(err => {
            hideScreenLoader();
            Snackbar.show({
                text: err.message,
                duration: Snackbar.LENGTH_SHORT,
              })
        });
    }

    let teams = [];
    const teamValueChange = (team) => {
        teams = team;
    }

    const team = () => {
        let newteam = []
        teams.filter((el) => el.isSelected).forEach((e, i) => {
            newteam.push(e.M_User_Id);
        })
        return newteam;
    }

    // const desc = (value) => {
    //     console.log(value); 
    //     setForm(Description, va)   
    // }

    const setForm = (field, value) => {
        if(field == "Description")
            form.Description = value;  
        if(field == "StartDate")
            form.StartDate = value; 
        if(field == "EndDate")
            form.EndDate = value; 
    }

    useEffect(() => {
        setForm("StartDate", today.getFullYear().toString() +"-"+(today.getMonth() + 1).toString() +"-"+today.getDate().toString());
        setForm("EndDate", today.getFullYear().toString() +"-"+(today.getMonth() + 1).toString() +"-"+today.getDate().toString())

        // console.log(form);
        return () => {
            controller.abort();
        }
    }, [])


    const header = <Header style={{elevation:0,backgroundColor:LIGHT}} >
            <Row style={{alignItems:"center", justifyContent:"space-between", backgroundColor:LIGHT,}}>
                <Column style={{paddingTop:10,backgroundColor:LIGHT,paddingHorizontal:15, width:"80%" }}>
                    <Texts style={{color:MAIN_CONTRAST, fontSize:16}}>Project Creation</Texts>
                    <Texts numberOfLines={1} ellipsizeMode='tail' style={{fontSize:30, color:MAIN}}>{projectName}</Texts>
                    
                </Column>
                <Row >
                 {/* <ButtonIconRounded rippleColor={MAIN_FOURTH} size={24} icon={"edit"} onPress={()=> dispatch(screenLoading())}/> */}
            
                    <ButtonIconRounded rippleColor={MAIN_FOURTH} size={24} icon={"edit"} onPress={()=> refRBSheet.current.open()}/>
            

                </Row>
            </Row>
        
                    
        </Header>;
    
    const footer = <Footer elevation={10}>
        <Column>
                <ButtonBlock onPress={onSave}  rippleColor={MAIN_SECOND} height={50} fontColor={MAIN} fontSize={20} fontWeight="500" style={{backgroundColor:MAIN_FOURTH}} uppercase={false}> Create</ButtonBlock>
            </Column>
    </Footer>
    return <Aux>
        <Foundation style={{backgroundColor:MAIN_FOURTH}} header={header} footer={footer} scrollable = {true}  >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
            <ContainerBox style={{ flex:1, paddingBottom:10}}>
                
                <Column style={{paddingHorizontal:15, marginTop:10}}>
                    <Texts style={{fontSize:15}}>Project Start At</Texts>
                </Column>
                <Column style={{}}>
                    <CalendarStraight initValue={today} activeColor={MAIN} activeTextColor={WHITE} onSelect={onStartDateSelect} textColor={MAIN} fontSize={25} style={{paddingHorizontal:15}} buttonColor={MAIN_CONTRAST}/>
                </Column>
                <Column style={{paddingHorizontal:15, marginTop:25}}>
                    <Texts style={{fontSize:15}}>Project End At</Texts>
                </Column>
                <Column style={{}}>
                    <CalendarStraight initValue={today} activeColor={MAIN} activeTextColor={WHITE} onSelect={onEndDateSelect} textColor={MAIN} fontSize={25} style={{paddingHorizontal:15}} buttonColor={MAIN_CONTRAST}/>
                </Column>
                <Column style={{paddingHorizontal:15, marginTop:25}}>
                    <Texts style={{fontSize:15}}>Asign To</Texts>
                </Column>
                <ProjectTeamCreation onValueChange={teamValueChange} />
                {/* <Column style={{paddingHorizontal:15, marginTop:25}}>
                    <Texts style={{fontSize:15, marginBottom:10}}>Description</Texts>
                    <StandartInput field={"Description"} multiline={true} onValueChange={setForm}  style={{paddingHorizontal:10, borderRadius:10, backgroundColor:"rgba(0,0,0, 0.1)"}}></StandartInput>
                </Column> */}
            </ContainerBox>
            {/* <Column>
                <ButtonBlock  rippleColor={MAIN_FOURTH} height={50} fontColor={LIGHT} fontSize={20} fontWeight="500" style={{backgroundColor:MAIN}} uppercase={false}> Create</ButtonBlock>
            </Column> */}
        </Foundation>
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            dragFromTopOnly={true}
            closeOnPressMask={false}
            customStyles={{
                container:{
                    backgroundColor:LIGHT,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15
                },
                wrapper: {
                    backgroundColor: "rgba(0,0,0, 0.4)"
                },
                draggableIcon: {
                    backgroundColor: MAIN
                }
            }}
            height={win.height - 130}
        >
            <ContainerBox style={{paddingTop:10, paddingBottom:20,flex:1, paddingHorizontal:15,}}>
                <Texts style={{color:MAIN, fontSize:40, fontWeight:"500"}}>Description</Texts>
                <Texts style={{color:MAIN_SECOND, fontSize:16, fontWeight:"500", marginBottom:10}}>Add Discription for this project, let your team know what this project for.</Texts>
                <StandartInput field={"Description"} multiline={true} onValueChange={setForm}  style={{paddingHorizontal:10, borderRadius:10, backgroundColor:"rgba(0,0,0, 0.1)"}}></StandartInput>
            </ContainerBox>
        </RBSheet>
    </Aux>
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    dispatch
}, dispatch)

export default connect(
    null,
mapDispatchToProps
)(ProjectCreationScreen);