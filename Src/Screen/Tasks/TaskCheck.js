import React, { memo, useEffect, useState, useRef } from 'react'
import { getData, deleteData, postData, getDataList } from '../../Selectors/Screen';
import { GET_TASKS_CHECK, MOVE_TASK} from '../../Const/Api';
import { showScreenLoader, hideScreenLoader } from '../../Components/Loader/ScreenLoader';
import Snackbar from 'react-native-snackbar';
import Foundation from '../../Components/Foundation';
import { StatusBar, RefreshControl, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import ContainerBox from '../../Components/Container/ContainerBox';
import Column from '../../Components/Column';
import Row from '../../Components/Row';
import Texts from '../../Components/Text';
import ListDataLazy from '../../Components/List/ListDataLazy';
import Aux from '../../Components/Auxx';
import { LIGHT, MAIN_CONTRAST, MAIN_SECOND, MAIN_FOURTH, FONT, GREY, WHITE, MAIN, DARK, MAIN_THIRD, DARK_SECOND } from '../../Const/Colors';
import { RandomString } from '../../Helper/General';
import CardRectangle from '../../Components/Card/CardRectangle';
import Checkbox from '../../Components/Checkbox/Checkbox';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import ButtonBlock from '../../Components/Button/ButtonBlock';
import { Colors } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import StandartInput from '../../Components/Input/StandartInput';
import AvatarSelectable from '../../Components/Avatar/AvatarSelectable';
import Alert from '../../Components/Alert/Alert';
import { connect } from 'react-redux';

const TaskCheckScreen = memo(({route, navigation, screen, ...props}) => {

    let controller = new AbortController();

    const styleAll = StyleSheet.create({
        welcomeText:{
            fontSize:15,
            color: MAIN_SECOND,
        },
        schedule:{ 
            backgroundColor:MAIN_FOURTH, 
            borderTopLeftRadius:30, 
            top:10,
            flex:1
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
            fontSize: 25,
            fontWeight: "500",
            flex: 4, 
            flexWrap: 'wrap',
            color:screen.darkmode ? MAIN_THIRD :MAIN,
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

    const { projectId, projectName } = route.params;

    const [tasks , setTasks] = useState([]);
    const [selectedTask , setSelectedTask] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const alert = useRef();

    const loadData = () => {
        setSelectedTask([]);
        setRefreshing(true);
        getDataList(GET_TASKS_CHECK+projectId, controller)
        .then(result => {
            setTasks(result);
            setRefreshing(false);
        })
        .catch(err => {
            setRefreshing(false);
            Snackbar.show({
                text:"Failed load task",
                duration:Snackbar.LENGTH_SHORT
            });
        })
    }

    useEffect(() => {
        loadData();
        return () => {
            controller.abort();
        }
    }, []);


    const onRefresh = () => {
        loadData()
    }
    
    let user = 0;
    const check = (item, checked) => {
        let found = selectedTask.findIndex(x => x.Id == item.Id);
        if(!checked && found > -1){
            selectedTask.splice(found, 1);
        }

        let newdata = [];
        if(checked && found == -1){
            selectedTask.push(item);
        }

        selectedTask.forEach((e, i) => {
            newdata.push(e);
        })
        setSelectedTask(newdata);
    }

    const markAsDone = () => {
        alert.current.hide();
        showScreenLoader("Updating");
        let body = {
            TasksIds:tasksIds()
        }

        postData(MOVE_TASK+"5", controller, body)
        .then(result => {
            hideScreenLoader();
            loadData();
            setSelectedTask([]);
        })
        .catch(err => {
            hideScreenLoader();
        })
    }

    const tasksIds = () => {
        return selectedTask.map((e, i) => {
            return e.Id;
        })
    }

    const renderTask = ({item, i}) => {
        let showName = false;
        if(item.M_User_Id != user){
            user = item.M_User_Id;
            showName = true;
        } else {
            showName = false;
        }

        
        let found = selectedTask.findIndex(x => x.Id == item.Id);
        return <Column key ={RandomString(10)} style={{paddingHorizontal:10, backgroundColor:WHITE }}>
            {showName ? <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:MAIN_SECOND, fontSize:20, marginLeft:10, paddingTop:10}}>{item.AssignTo}</Texts> : null}
            {/* <CardRectangle rippleColor={MAIN_FOURTH} style={{ width:"100%", backgroundColor:WHITE}} > */}
                <Column key ={RandomString(10)} style={{marginTop:5, paddingHorizontal:10}}>
                    
                    <Row style={{width:"100%", alignItems:"center" }}>
                    <Checkbox
                        isChecked={found > -1}
                        checkedColor={MAIN_CONTRAST}
                        value={false}
                        item={item}
                        onValueChange={check}
                        style={{}}
                    />
                        <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:GREY, fontSize:16, marginHorizontal: 15}}>{item.Name} </Texts>
                    </Row>

                        
                </Column> 
            {/* </CardRectangle> */}
        </Column>
    }

    return <Aux>
        <Foundation style={{backgroundColor:screen.darkmode ? DARK : LIGHT}} scrollable = {false}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
            <ContainerBox style={{marginTop:40, flex:1}}>
                <Column  style={{ paddingHorizontal:20, marginBottom:20}}> 
                    <Row style={{justifyContent:"space-between"}}>
                        <Texts numberOfLines={2} ellipsizeMode='tail' style={styleAll.nameText}>{projectName}</Texts>
                     
                    </Row>
                    <Texts style={{fontSize:17, color:screen.darkmode ? GREY :MAIN_SECOND}} numberOfLines={2} ellipsizeMode='tail' >Story you should check and mark as done</Texts>
                    
                </Column>
                
                <Column style={{flex:1, backgroundColor:screen.darkmode ? DARK_SECOND : WHITE, height:"100%"}}> 
                
                    <ListDataLazy 
                        
                        refreshControl={<RefreshControl progressBackgroundColor={screen.darkmode ? DARK_SECOND : WHITE} colors={screen.darkmode ? [GREY] : [MAIN_SECOND]} refreshing={refreshing} onRefresh={onRefresh} />} 
                        alwaysBounceVertical={true} 
                        showsVerticalScrollIndicator={false} 
                        style={{flex:1}} 
                        contentContainerStyle={{flexGrow: 1}} 
                        renderItem={renderTask} 
                        data = {tasks} 
                        keyExtractor={item => item.Id}
                    />
                </Column>

            </ContainerBox>        
        </Foundation>
        
        {(selectedTask.length > 0) ? <Column reverse={true} style={{ position:"absolute", top: 0, left: 0, right: 0, bottom: 10,  alignItems:"center"}}>
            <ButtonIconCircle onPress={() => {alert.current.show()}} icon={"check"} color={MAIN_CONTRAST} size={20} style={{elevation:5, backgroundColor:WHITE }}/>
        </Column> :null}
        
        <Alert ref={alert}
            onCancel={()=> {alert.current.hide()}}
            onConfirm={markAsDone}
        >
            <Texts style={{fontSize:18, color:GREY}}>Item selected will marked as Done</Texts>
         </Alert>
    </Aux>

});



const mapStateToProps = (state) => {
    const { sprint, screen } = state;
    return {
        screen:screen,
        sprint:sprint
    }
}

// const mapDispatchToProps = { setSprints, screenLoading }

export default connect(
    mapStateToProps,
null
)(TaskCheckScreen);