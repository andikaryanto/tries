import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Aux from '../../Components/Auxx';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import CalendarEvent from '../../Components/Calendar/CalendarEvent';
import Column from '../../Components/Column';
import ContainerBox from '../../Components/Container/ContainerBox';
import Foundation from '../../Components/Foundation';
import Row from '../../Components/Row';
import Texts from '../../Components/Text';
import { FONT, LIGHT, MAIN, MAIN_CONTRAST, MAIN_SECOND, WHITE } from '../../Const/Colors';
const CalendarScreen = React.memo(({route, ...props}) => {
    const { projectName, projectId } = route.params;

    return <Aux>
        <Foundation style={{backgroundColor:LIGHT}} scrollable = {false}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
            <ContainerBox style={{marginTop:40, flex:1}}>
                <Column style={{ paddingHorizontal:20, marginBottom:10}}> 
                       
                       <Row >
                            <Texts numberOfLines={2} ellipsizeMode='tail' style={styleAll.nameText}>{projectName}</Texts>
                           
                       </Row>
                       <Texts style={styleAll.welcomeText}>Your calendar</Texts>
                   
                </Column>
                <Column style={{  backgroundColor:WHITE, flex:1}}> 
                    <CalendarEvent style={styleAll.calendar} textColor={MAIN} buttonColor={MAIN_CONTRAST} fontSize={20}/>
                </Column>
            </ContainerBox>
        </Foundation>
    </Aux>;
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
    calendar : {
        paddingHorizontal:15
    }
});

const mapStateToProps = (state) => {
    const{ project, task, screen} = state;
    return {
        task:task
    }
}

const mapDispatchToProps = {  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarScreen);