import React, { memo } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleScreen from '../Tasks/Schedule';
import SprintScreen from '../Sprints/Sprint';
import BottomStandartTab from '../../Components/BottomTabBar/BottomStandarTab';
import Row from '../../Components/Row';
import Circle from '../../Components/Circle';
import Texts from '../../Components/Text';
import { MAIN_THIRD, LIGHT, MAIN, MAIN_CONTRAST, WHITE, GREY, DARK_SECOND, DARK } from '../../Const/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import Column from '../../Components/Column';
import { RandomString } from '../../Helper/General';
import TaskCheckScreen from '../Tasks/TaskCheck';
import CalendarScreen from '../Tasks/Calendar';
import { connect } from 'react-redux';

const Tab = createBottomTabNavigator();
const ProjectEachScreen = memo(({route, navigation, screen}) => {
    const { projectId, projectName, isYours } = route.params;
    
    
  if(!isYours){
    return <ScheduleScreen item={projectId} navigation={navigation} />
  }

    const tabTitle = [
      {id:"1",name:"Project", icon:"home"}, 
      // {id:"2",name:"Calendar", icon:"calendar"}, 
      {id:"3",name:"Sprint", icon:"open-book"}, 
      {id:"4",name:"Check", icon:"hand"}
    ];
    const tabComponent = tabTitle.map((e,index) => {
        return <Column key={RandomString(10)} style={{ alignItems:"center", paddingLeft:2, paddingRight:10, paddingVertical:2, marginRight:10, borderRadius:25}}>
        
            <Icon color={MAIN} size={20} name={e.icon} ></Icon>
            <Texts style={{fontSize:14, color:MAIN}}>{e.name}</Texts>
        </Column>;
    })
    
  return (
    <Tab.Navigator tabBarOptions={{
      // style:{backgroundColor:MAIN_CONTRAST},
      // tabStyle:{backgroundColor:screen.darkmode ? DARK : WHITE}
      // activeTintColor:MAIN_THIRD
      tabStyle:{backgroundColor:MAIN_CONTRAST}
      
    }} backBehavior={"none"} tabBar={props => <BottomStandartTab style={{borderRadius: 25, backgroundColor:screen.darkmode ? DARK_SECOND : WHITE, position: "absolute", bottom:5, marginBottom:10, marginHorizontal:10}} {...props} {...props} tabTitle={tabTitle} activeColor={screen.darkmode ? MAIN_THIRD : MAIN} inactiveColor={GREY}/>}>
      <Tab.Screen name="Home" >{props => <ScheduleScreen {...props} item={projectId} navigation={navigation} />}</Tab.Screen>
      {/* <Tab.Screen name="Calendar" >{props => <CalendarScreen {...props} route={route} item={projectId} navigation={navigation} />}</Tab.Screen> */}
      <Tab.Screen name="Sprint" >{props => <SprintScreen {...props} route={route} item={projectId} navigation={navigation} />}</Tab.Screen>
      <Tab.Screen name="Check" >{props => <TaskCheckScreen {...props} route={route} item={projectId} navigation={navigation} />}</Tab.Screen>
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
});

const mapStateToProps = (state) => {
  const { screen } = state;
  return {
      screen:screen
  }
}


export default connect(
  mapStateToProps,
  null
)(ProjectEachScreen);