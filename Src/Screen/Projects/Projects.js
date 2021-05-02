import React, { memo, useEffect } from 'react';
import Aux from '../../Components/Auxx';
import Foundation from '../../Components/Foundation';
import { LIGHT, WHITE, MAIN, MAIN_SECOND, FONT, GREY, MAIN_FOURTH, MAIN_CONTRAST, WARNING, DARK, DARK_SECOND, MAIN_THIRD } from '../../Const/Colors';
import { StatusBar, StyleSheet } from 'react-native';
import ContainerBox from '../../Components/Container/ContainerBox';
import Column from '../../Components/Column';
import Row from '../../Components/Row';
import Texts from '../../Components/Text';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import RoundedAvatar from '../../Components/Avatar/RoundedAvatar';
// import RBSheet from "react-native-raw-bottom-sheet";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Username from '../Components/Username';
import ProjectList from './ProjectList';
import { setLoggedIn } from '../../Selectors/Auth';
import CardRectangle from '../../Components/Card/CardRectangle';
import MyAvatar from '../Components/Myavatar';
import Position from '../Components/Position';
import { screenLoading } from '../../Actions/Screen';
import ProgressBarLine from '../../Components/ProgressBar/ProgressBarLine';

const ProjectsScreen = memo(({ navigation, screen, ...props }) => {
    const styleAll = StyleSheet.create({
        welcomeText: {
            fontSize: 17,
            color: screen.darkmode ? GREY : MAIN_SECOND,
        },
        nameText: {
            fontSize: 25,
            fontWeight: "500",
            flex: 4,
            flexWrap: 'wrap',
            color: screen.darkmode ? MAIN_THIRD : FONT,
        },
    });

    return <Aux>
        <Foundation style={{ backgroundColor: screen.darkmode ? DARK : LIGHT }} scrollable={false}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true} />
            <ContainerBox style={{ marginTop: 40, flex: 1 }}>
                <Column style={{ paddingHorizontal: 20 }}>
                    <Row style={{ justifyContent: "space-between", paddingBottom: 10, alignItems: "center" }} >

                        <MyAvatar onPress={() => navigation.navigate("ProfileScreen")}></MyAvatar>
                        <Column style={{ width: "80%", justifyContent: "center" }}>
                            <Row>
                                <Username numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{ fontSize: 30, color: screen.darkmode ? MAIN_THIRD : MAIN }} startText="Hello" />
                            </Row>
                            <Position />


                        </Column>

                    </Row>
                    <Row >
                        <Texts numberOfLines={2} ellipsizeMode='tail' style={styleAll.nameText}>Projects</Texts>

                    </Row>
                    <Texts style={styleAll.welcomeText}>These are all running projects you interact with.</Texts>
                    <Texts style={styleAll.welcomeText}>Or do you have plan to create one ?</Texts>

                    <Row style={{ zIndex: 1, marginBottom: -24, justifyContent: 'flex-end' }}>
                        {/* <ButtonIconCircle  rippleColor={WHITE} style={{backgroundColor:MAIN, elevation:0,  }} color={WHITE} size ={20} icon={"plus"} onPress={() => dispatch(screenLoading())}></ButtonIconCircle> */}
                        {/* <Column style={{backgroundColor:LIGHT, borderRadius:50}}> */}

                        <ButtonIconCircle rippleColor={WHITE} style={{ backgroundColor: screen.darkmode ? MAIN_SECOND : MAIN, elevation: 0 }} color={screen.darkmode ? LIGHT : WHITE} size={20} icon={"plus"} onPress={() => navigation.navigate("ProjectCreateScreen")}></ButtonIconCircle>
                        {/* </Column> */}
                    </Row>
                </Column>
                <Column style={{ justifyContent: "center", paddingHorizontal: 10, flex: 1, backgroundColor: screen.darkmode ? DARK_SECOND : WHITE }}>

                    <ProjectList navigation={navigation} />
                </Column>
            </ContainerBox>
        </Foundation>
    </Aux>


});



const mapStateToProps = state => {
    const { screen } = state;
    return {
        screen: screen
    }
}


// const mapDispatchToProps = { setMineTask, screenLoading }

export default connect(
    mapStateToProps,
    null
)(ProjectsScreen);