import React, { memo, useEffect, useRef, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Aux from '../../Components/Auxx';
import Column from '../../Components/Column';
import ContainerBox from '../../Components/Container/ContainerBox';
import Foundation from '../../Components/Foundation';
import Row from '../../Components/Row';
import MyAvatar from '../Components/Myavatar';
import Position from '../Components/Position';
import Username from '../Components/Username';
import Texts from '../../Components/Text';
import { FONT, GREY, LIGHT, MAIN, MAIN_CONTRAST, MAIN_FOURTH, MAIN_SECOND, WHITE } from '../../Const/Colors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import Header from '../../Components/Header/Header';
import ButtonIconRounded from '../../Components/Button/ButtonIconRounded';
import { Footer } from 'native-base';
import ButtonBlock from '../../Components/Button/ButtonBlock';
import CalendarStraight from '../../Components/Calendar/CalendarStraight';
import StandartInput from '../../Components/Input/StandartInput';
import { postData } from '../../Selectors/Screen';
import { CREATE_SPRINT } from '../../Const/Api';
import Snackbar from 'react-native-snackbar';
import { hideScreenLoader, showScreenLoader } from '../../Components/Loader/ScreenLoader';
import Alert from '../../Components/Alert/Alert';
import { setLastAddedSprint } from '../../Actions/Module/Sprints';


const CreateSprintScreen = memo(({navigation, route, dispatch, ...props}) => {

    const { projectName, projectId } = route.params;

    let controller = new AbortController();
    let today = new Date();


    // const [sprints , setSprints] = useState(null);
    const alert = useRef();
    const [form , setForm] = useState(
        {
            M_Project_Id:projectId,
            Name:"",
            Description:"",
            DateStart:null,
            DateEnd:null
        }
    );
    const onSave = () => {

        if(form.Name == "" || form.Name == null){
            Snackbar.show({
                text:"Name cant be empty",
                duration:Snackbar.LENGTH_SHORT
            });

            return;
        }
        if(form.Description == "" || form.Description == null){
            Snackbar.show({
                text:"Description cant be empty",
                duration:Snackbar.LENGTH_SHORT
            });

            return;
        }
        if(form.DateStart == "" || form.DateStart == null){
            Snackbar.show({
                text:"Date Start cant be empty",
                duration:Snackbar.LENGTH_SHORT
            });

            return;
        }
        if(form.DateEnd == "" || form.DateEnd == null){
            Snackbar.show({
                text:"Date End cant be empty",
                duration:Snackbar.LENGTH_SHORT
            });

            return;
        }

        alert.current.show();

        
    }

    const onConfirm = () => {
        const { setLastAddedSprint } = props; 
        alert.current.hide();
        showScreenLoader("Saving")
        postData(CREATE_SPRINT, controller, form)
        .then(result => {
            hideScreenLoader();
            // setLastAddedSprint(result);
            navigation.goBack();
        })
        .catch(err => {
            
            hideScreenLoader();
            Snackbar.show({
                text:err.message,
                duration:Snackbar.LENGTH_SHORT
            })
        })
    }

    const onStartDateSelect = (date) => {
        let newDate = date;
        setSprint("StartDate", newDate.getFullYear().toString() +"-"+(newDate.getMonth() + 1).toString() +"-"+(newDate.getDate() - 1).toString());
    }

    const onEndDateSelect = (date) => {
        let newDate =  date;
        setSprint("EndDate", newDate.getFullYear().toString() +"-"+(newDate.getMonth() + 1).toString() +"-"+(newDate.getDate()-1).toString());
    }

    const setSprint = (field, value) => {
        // console.log(field);
        if(field == "Name"){
            setForm({...form, Name:value});
        }
        if(field == "Description"){
            setForm({...form, Description:value});
        }// console.log(field);
        if(field == "StartDate"){
            setForm({...form, DateStart:value});
        }
        if(field == "EndDate"){
            setForm({...form, DateEnd:value});
        }
    }

    useEffect(() => {
        setSprint("StartDate", today.getFullYear().toString() +"-"+(today.getMonth() + 1).toString() +"-"+today.getDate().toString());
        setSprint("EndDate", today.getFullYear().toString() +"-"+(today.getMonth() + 1).toString() +"-"+today.getDate().toString())

        // console.log(form);
        return () => {
            controller.abort();
        }
    }, [])

    const header = <Header style={{elevation:0,backgroundColor:LIGHT}} >
            <Row style={{alignItems:"center", justifyContent:"space-between", backgroundColor:LIGHT,}}>
                <Column style={{paddingTop:10,backgroundColor:LIGHT,paddingHorizontal:15, width:"80%" }}>
                    <Texts style={{color:MAIN_CONTRAST, fontSize:16}}>Sprint Creation</Texts>
                    <Texts numberOfLines={2} ellipsizeMode='tail' style={{fontSize:25, color:MAIN}}>{projectName}</Texts>
                    
                </Column>
                
            </Row>
        
                    
        </Header>;
    
    const footer = <Footer elevation={10}>
                <ButtonBlock onPress={onSave}  rippleColor={MAIN_SECOND} height={50} fontColor={MAIN} fontSize={20} fontWeight="500" style={{backgroundColor:MAIN_FOURTH}} uppercase={false}> Create</ButtonBlock>
            
    </Footer>


    return <Aux>
            <Foundation style={{backgroundColor:MAIN_FOURTH}} header={header} footer={footer} scrollable = {true}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
                <ContainerBox style={{ flex:1, paddingBottom:10}}>
                    <Column style={{paddingHorizontal:15, marginTop:10}}>
                        <Texts style={{color:GREY, marginBottom:5}}>Name</Texts>
                        <StandartInput field={"Name"} multiline={true} onValueChange={setSprint}  style={{paddingHorizontal:10, borderRadius:10, backgroundColor:"rgba(0,0,0, 0.1)", marginBottom:10}}></StandartInput>
                        <Texts style={{color:GREY, marginBottom:5}}>Description</Texts>
                        <StandartInput field={"Description"} multiline={true} onValueChange={setSprint}  style={{paddingHorizontal:10, borderRadius:10, backgroundColor:"rgba(0,0,0, 0.1)", marginBottom:10}}></StandartInput>
                    </Column>
                    <Column style={{paddingHorizontal:15, marginTop:10}}>
                        <Texts style={{fontSize:15}}>Start At</Texts>
                    </Column>
                    <Column style={{}}>
                        <CalendarStraight initValue={today} activeColor={MAIN} activeTextColor={WHITE} onSelect={onStartDateSelect} textColor={MAIN} fontSize={25} style={{paddingHorizontal:15}} buttonColor={MAIN_CONTRAST}/>
                    </Column>
                    <Column style={{paddingHorizontal:15, marginTop:25}}>
                        <Texts style={{fontSize:15}}>End At</Texts>
                    </Column>
                    <Column style={{}}>
                        <CalendarStraight initValue={today} activeColor={MAIN} activeTextColor={WHITE} onSelect={onEndDateSelect} textColor={MAIN} fontSize={25} style={{paddingHorizontal:15}} buttonColor={MAIN_CONTRAST}/>
                    </Column>
                </ContainerBox>
            </Foundation>

            <Alert ref={alert} onCancel={() => {alert.current.hide()} } onConfirm={onConfirm}>
                <Texts style={{fontSize:16}}> If you commit this Sprint, unfinished story will be sent back to Back Log</Texts>
            </Alert>
        </Aux>


});

const styleAll = StyleSheet.create({
    welcomeText:{
        fontSize:17,
        color:MAIN_SECOND,
    },    
    nameText: {
        fontSize: 25,
        fontWeight: "500",
        flex: 4, 
        flexWrap: 'wrap',
        color:FONT,
    },
});

const mapStateToProps = (state) => {
    const { auth, screen } = state;
    return {
        auth:auth,
        screen:screen
    }
}

const mapDispatchToProps = { setLastAddedSprint }

export default connect(
    null,
mapDispatchToProps
)(CreateSprintScreen);