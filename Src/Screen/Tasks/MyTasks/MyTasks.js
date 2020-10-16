import React, { memo, useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LIGHT, MAIN, MAIN_FOURTH, WHITE,  MAIN_SECOND, GREY, MAIN_CONTRAST, MAIN_THIRD, WARNING, FONT, MAIN_FONT, DARK } from '../../../Const/Colors';
import { StyleSheet, Dimensions, StatusBar, I18nManager, TouchableWithoutFeedback, UIManager, findNodeHandle } from 'react-native';
import ContainerBox from '../../../Components/Container/ContainerBox';
import Texts from '../../../Components/Text';
import Column from '../../../Components/Column';
import Row from '../../../Components/Row';
import Foundation from '../../../Components/Foundation';
import Aux from '../../../Components/Auxx';
import Footer from '../../../Components/Footer/Footer';
import ButtonBlock from '../../../Components/Button/ButtonBlock';
import ButtonIconCircle from '../../../Components/Button/ButtonIconCircle';
import { Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoundedAvatar from '../../../Components/Avatar/RoundedAvatar';
import TodoScreen from '../Todo';
import Circle from '../../../Components/Circle';
import PilTabBar from '../../../Components/TopTabBar/PilTabBar';
import Animated from 'react-native-reanimated';
import { View } from 'native-base';
import StandartTabBar from '../../../Components/TopTabBar/StandartTabBar';
import PopupMenu from '../../../Components/Popup';
import { getData, getDataList } from '../../../Selectors/Screen';
import { GET_MYTASK } from '../../../Const/Api';
import Backlog from './Backlog';
import Username from '../../Components/Username';
import Position from '../../Components/Position';
import MyAvatar from '../../Components/Myavatar';
import Plan from './Plan';
import Doing from './Doing';
import Check from './Check';
import Done from './Done';
import { setMineTask } from '../../../Actions/Module/Tasks';
import { hideScreenLoader, showScreenLoader } from '../../../Components/Loader/ScreenLoader';

const MyTasksScreen = memo(({dispatch, navigation, route, screen, ...props}) => {

    const {projectId, projectName, activeSprint }  = route.params;
   
    let controller = new AbortController();

    const Tab = createMaterialTopTabNavigator();
    const tabTitle = [{id:"1",name:"Back Log", icon:"home"},
    {id:"2",name:"Plan", icon:"clipboard"},
    {id:"3",name:"Doing", icon:"cog"},
    {id:"4",name:"Check", icon:"hand"},
    {id:"5",name:"Done", icon:"check"}];

    const loadData = () => {
        console.log(projectId);
        const { setMineTask } = props;
        showScreenLoader("Loading Your Task")
        getDataList(GET_MYTASK+projectId, controller)
        .then(result => {
            console.log(result);
            setMineTask(result);
            hideScreenLoader();
        })
        .catch(err => {
            hideScreenLoader();
        })
    }

    useEffect(() => {
        loadData();
        return () => {
            controller.abort();
        }
    }, [])
    
    const tabComponent = tabTitle.map((e,index) => {
        return <Row style={{backgroundColor:MAIN_THIRD, alignItems:"center", paddingLeft:2, paddingRight:10, paddingVertical:2, marginLeft:(index == 0 ? 20 : 0), marginRight:10, borderRadius:25}}>
            <Circle style={{backgroundColor:LIGHT, marginRight:10}} width={30}>
                <Icon color={MAIN} size={20} name={e.icon} ></Icon>
            </Circle>
            <Texts style={{fontSize:18, color:MAIN}}>{e.name}</Texts>
            {/* <Texts style={{fontSize:18, color:LIGHT}}>  7</Texts> */}
        </Row>;
    })
    
    return <>
        <Aux>
            <Foundation style={{backgroundColor:screen.darkmode ? DARK : LIGHT}} scrollable = {false} >
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
               
                    <ContainerBox style={{flex:1, backgroundColor:screen.darkmode ? DARK : WHITE}}>
                        <Column style={{backgroundColor:screen.darkmode ? DARK : WHITE, paddingHorizontal:20, paddingBottom:15}}>
                            <Row style={{justifyContent:"space-between", paddingTop:40, paddingBottom:10, alignItems:"center"}}>
                                
                            <   MyAvatar onPress ={() => navigation.navigate("ProfileScreen")}></MyAvatar>
                                <Column style={{width:"80%", justifyContent:"center"}}>
                                    <Row>
                                        <Username numberOfLines={1} ellipsizeMode='tail' style={{fontSize:30, color:screen.darkmode ? MAIN_THIRD : MAIN}} startText={"Hello"}/>
                                        {/* <Texts numberOfLines={1} ellipsizeMode='tail' style={{fontSize:30, color:MAIN}}>Hello, Andik Aryanto</Texts> */}
                                    </Row>
                                    <Position style={{fontSize:15, color:GREY}}/>

                                    {/* <PopupMenu style={{backgroundColor:screen.darkmode ? DARK : WHITE}} actions={['1', '2']}  onPress={() => { }}> */}
                                        <Row>
                                            <Texts style={{fontSize:15, color:MAIN_CONTRAST}} >{activeSprint}</Texts>
                                            {/* <Icon  color={MAIN_CONTRAST} size={15} name={"chevron-small-down"} ></Icon> */}
                                        </Row>
                                    {/* </PopupMenu */}
                                    
                                </Column>
                            </Row>
                            {/* <ButtonIconCircle onPress={() => refRBSheet.current.open()} icon={"twitter"} ></ButtonIconCircle> */}

<Texts numberOfLines={1} ellipsizeMode='tail' style={{fontSize:18, color:screen.darkmode ? GREY : MAIN}}>{projectName}</Texts>
                        </Column>
                        <Tab.Navigator backBehavior={"none"} tabBarOptions={{
                            activeTintColor:MAIN_CONTRAST,
                            inactiveTintColor:MAIN,
                            scrollEnabled:true,
                            tabStyle:{elevation:0, height:38},
                            indicatorStyle:{backgroundColor:MAIN, height:28, borderRadius:20, },
                            
                        }}  tabBar={(props) => <PilTabBar {...props} component={tabComponent} activeColor={MAIN_CONTRAST} activeFontColor={WHITE}/>}>
                            <Tab.Screen name="d"  >{props => <Backlog {...props} route={route} navigation={navigation} />}</Tab.Screen>
                            <Tab.Screen name="e" >{props => <Plan {...props} route={route} navigation={navigation} />}</Tab.Screen>
                            <Tab.Screen name="a" >{props => <Doing {...props} route={route} navigation={navigation} />}</Tab.Screen>
                            <Tab.Screen name="b" >{props => <Check {...props} route={route} navigation={navigation} />}</Tab.Screen>
                            <Tab.Screen name="c"  >{props => <Done {...props} route={route} navigation={navigation} />}</Tab.Screen>
                        </Tab.Navigator>
                    </ContainerBox>
            </Foundation>

    
    </Aux>
    </>
});

// tabBar={(props) => <PilTabBar setSelected={setSelected} {...props} component={tabComponent} activeColor={MAIN_CONTRAST} activeFontColor={WHITE}/>} 

const mapStateToProps = (props ) => {
    const{ screen} = props;
    return {
        screen:screen
    }
}
const mapDispatchToProps = { setMineTask }

export default connect(
    mapStateToProps,
mapDispatchToProps
)(MyTasksScreen);
