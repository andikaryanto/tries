import React, { memo, useEffect, useState, useRef } from 'react'
import { getData, deleteData, postData } from '../../Selectors/Screen';
import { GET_TASK, DELETE_BATCH_TASK, BASE_URL, CREATE_TASK, GET_TASKS } from '../../Const/Api';
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
import { LIGHT, MAIN_CONTRAST, MAIN_SECOND, MAIN_FOURTH, FONT, GREY, WHITE, MAIN } from '../../Const/Colors';
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
import Icon from 'react-native-vector-icons/Entypo';
import { screenLoading } from '../../Actions/Screen';
import { setTaskDetails, setTasks } from '../../Actions/Module/Tasks';
import { connect } from 'react-redux';

const TaskScreen = memo(({route, navigation, screen, task, ...props}) => {

    let controller = new AbortController();

    const { TaskId, TaskName, ProjectName, Teams, IsYours } = route.params;

    const [selectedTask , setSelectedTask] = useState([]);
    const [backlogDetail, setBackLogDetail] = useState({
        M_User_Id:null,
        T_Task_Id:0,
        BackLog:"",
        Name:"",
        Description:""
    })

    const refRBSheetTask = useRef();
    const alert = useRef();
    const win = Dimensions.get("screen");

    const loadData = () => {
        const { screenLoading, setTaskDetails } = props;
        setSelectedTask([]);
        screenLoading(true);
        getData(GET_TASKS+TaskId, controller)
        .then(result => {
            screenLoading(false);
            setTaskDetails(result);
        })
        .catch(err => {
            
            screenLoading(false);
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


    // if(tasks == null){
    //     return null;
    // }

    const saveTask = () => {
        if(backlogDetail.M_User_Id == null || backlogDetail.M_User_Id == 0){
            Snackbar.show({
                text:"Please assign team"
            });
            return;
        }

        if(backlogDetail.Name == null || backlogDetail.Name == ""){
            Snackbar.show({
                text:"Task name cant be empty"
            });
            return;
        }
        if(backlogDetail.Description == null || backlogDetail.Description == ""){
            Snackbar.show({
                text:"Description cant be empty"
            });
            return;
        }
        postData(CREATE_TASK, controller, backlogDetail)
        .then(result => {
            refRBSheetTask.current.close();
            loadData();
        })
        .catch(err => {
            Snackbar.show({
                text:err.message,
                duration: Snackbar.LENGTH_SHORT
            })
        })
    }

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

    const deletebatch = () => {
        alert.current.hide();
        showScreenLoader("Removing Task")
        let ids = [];
        ids = selectedTask.map((e, i) => {
            return e.Id;
        })

        let body = {
            TaskIds : ids
        }
        deleteData(DELETE_BATCH_TASK, controller, body)
        .then(result => {
            hideScreenLoader();
            loadData();
        })
        .catch(err => {
            hideScreenLoader();
            Snackbar.show({
                text:err.message,
                duration:Snackbar.LENGTH_SHORT
            })
        })
    }

    const setTask = (field, value) => {
        // console.log(field);
        if(field == "Task"){
            setBackLogDetail({...backlogDetail, Name:value});
        }
        if(field == "Description"){
            setBackLogDetail({...backlogDetail, Description:value});
        }
    }

    const addTaskDeatail = () => {
        // backlogDetail.T_Task_Id= item.Id
        // backlogDetail.BackLog= item.Name
        // console.log(backlogDetail);
        setBackLogDetail({...backlogDetail, T_Task_Id:TaskId, BackLog:""});
        refRBSheetTask.current.open();
    }

    const avatarSelect = (item, selected) => {
        // console.log();
        let newitem = item;
        if(selected){
           
            setBackLogDetail({...backlogDetail, M_User_Id:item.M_User_Id});
        } else {
            setBackLogDetail({...backlogDetail, M_User_Id:null});
        }
    }

    const moveToDetail = (item) => {
        navigation.navigate("TaskDetailScreen", {taskId:item.Id, taskName:item.Name, taskDesciption:item.Description});
    }

    

    const renderTeams = ({item, i}) => {
        let selected = item.M_User_Id == backlogDetail.M_User_Id;
        // return <Avatar canSelect={false} containerStyle={{marginRight:10}} source={{uri:BASE_URL+item.Photo}}></Avatar>
        return <Row style={{padding:5, alignItems:"center", marginBottom:5}} >

                        <AvatarSelectable selected={selected} onSelect={avatarSelect} data={item} containerStyle={{marginRight:10}} source={{uri:BASE_URL+item.Photo}}></AvatarSelectable>
                       
                        <Column>
                            <Texts style={{color:MAIN, fontSize:20}}>{item.Name}</Texts>
                            <Texts style={{color:GREY, fontSize:15}}>{item.Position}</Texts>
                        </Column>
                    </Row>
    }

    const renderTask = ({item, i}) => {
        let showName = false;
        if(item.M_User_Id != user){
            user = item.M_User_Id;
            showName = true;
        } else {
            showName = false;
        }

        let color = MAIN_SECOND;
        let status = "New";
        if(item.Type == 2){
            color = MAIN;
            status = "Plan";
        } else if( item.Type == 3){
            color = Colors.red300;
            status = "Doing";
        } else if(item.Type == 4) {
            color = Colors.blue300;
            status = "Check";
        } else if(item.Type == 5){
            color = MAIN_CONTRAST;
            status = "Done";
        }
        
        let found = selectedTask.findIndex(x => x.Id == item.Id);
        return <Column key ={RandomString(10)} style={{paddingHorizontal:10, backgroundColor:WHITE}}>
            {showName ? <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:MAIN_SECOND, fontSize:20, marginLeft:10, paddingTop:10}}>{item.AssignTo}</Texts> : null}
            {/* <CardRectangle rippleColor={MAIN_FOURTH} style={{ width:"100%", backgroundColor:WHITE}} > */}
                <Column key ={RandomString(10)} style={{marginTop:5, paddingHorizontal:10}}>
                    
                    <Row style={{alignItems:"center" }}>
                    { IsYours ? <Checkbox
                        isChecked={found > -1}
                        checkedColor={MAIN_CONTRAST}
                        value={false}
                        item={item}
                        onValueChange={check}
                        style={{marginRight:10}}
                    /> : <Icon name={"dot-single"} color={GREY} style={{marginLeft:7}}></Icon>}
                        {/* <TouchableWithoutFeedback onPress={() => console.log("here")}> */}
                        <CardRectangle style={{width:"90%", }} padding={5} rippleColor={MAIN_FOURTH} onPress={() => { moveToDetail(item)}}>
                            <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:MAIN, fontSize:16, marginHorizontal: 15}}>{item.Name} </Texts>
                            <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:GREY, fontSize:13, marginHorizontal: 15}}>{item.Description} </Texts>
                            <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:color, fontSize:13, marginHorizontal: 15}}>{status} </Texts>
                            <Row style={{marginTop:10, alignItems:"center"}}>
                                <Icon name={"chat"} color={GREY} size={15} style={{marginLeft:15, marginRight:5}}></Icon>
                                <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:GREY, fontSize:13}}>{item.Comments} </Texts>
                            </Row>
                        </CardRectangle>
                        
                        {/* </TouchableWithoutFeedback> */}
                    </Row>

                        
                </Column> 
            {/* </CardRectangle> */}
        </Column>
    }

    return <Aux>
        <Foundation style={{backgroundColor:LIGHT}} scrollable = {false}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="dark-content" hidden={false} translucent={true}/>
            <ContainerBox style={{marginTop:40, flex:1}}>
                <Column  style={{ paddingHorizontal:20, paddingBottom:IsYours ? 0 : 20}}> 
                    <Row style={{justifyContent:"space-between"}}>
                        <Texts numberOfLines={2} ellipsizeMode='tail' style={styleAll.nameText}>{ProjectName}</Texts>
                     
                    </Row>
                    <Texts style={{fontSize:17, color:MAIN_SECOND}} numberOfLines={2} ellipsizeMode='tail' >{TaskName}</Texts>
                    { IsYours ? <Row style = {{ zIndex:1, marginBottom:-24, justifyContent: 'flex-end'}}>
                        {/* <ButtonIconCircle  rippleColor={WHITE} style={{backgroundColor:MAIN, elevation:0,  }} color={WHITE} size ={20} icon={"plus"} onPress={() => dispatch(screenLoading())}></ButtonIconCircle> */}
                        
                        <ButtonIconCircle  rippleColor={WHITE} style={{backgroundColor:MAIN, elevation:0,  }} color={WHITE} size ={20} icon={"plus"} onPress={addTaskDeatail}></ButtonIconCircle>
                    </Row> : null}
                </Column>
                
                <Column style={{flex:1, backgroundColor:WHITE, height:"100%"}}> 
                
                    <ListDataLazy 
                        
                        refreshControl={<RefreshControl refreshing={screen.loading} onRefresh={onRefresh} />} 
                        alwaysBounceVertical={true} 
                        showsVerticalScrollIndicator={false} 
                        style={{flex:1}} 
                        contentContainerStyle={{flexGrow: 1}} 
                        renderItem={renderTask} 
                        data = {task.taskdetails.Taskdetails || []} 
                        keyExtractor={item => item.Id}
                    />
                </Column>

            </ContainerBox>        
        </Foundation>
        
        {(selectedTask.length > 0) ? <Column reverse={true} style={{ position:"absolute", top: 0, left: 0, right: 0, bottom: 10,  alignItems:"center"}}>
            <ButtonIconCircle onPress={() => {alert.current.show()}} icon={"trash"} color={Colors.red400} size={20} style={{elevation:5, backgroundColor:WHITE }}/>
        </Column> :null}
        <RBSheet
            ref={refRBSheetTask}
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
            height={win.height-150}
        >
            
            <ContainerBox style={{paddingTop:10, paddingBottom:20,flex:1, paddingHorizontal:15,}}>
                <Texts style={{color:MAIN, fontSize:30, fontWeight:"500", marginBottom:10}}>{task.taskdetails.Name || ""}</Texts>
                <Texts style={{color:GREY, marginBottom:5}}>Story</Texts>
                <StandartInput field={"Task"} multiline={true} onValueChange={setTask}  style={{paddingHorizontal:10, borderRadius:10, backgroundColor:"rgba(0,0,0, 0.1)", marginBottom:10}}></StandartInput>
                <Texts style={{color:GREY, marginBottom:5}}>Description</Texts>
                <StandartInput field={"Description"} multiline={true} onValueChange={setTask}  style={{paddingHorizontal:10, borderRadius:10, backgroundColor:"rgba(0,0,0, 0.1)", marginBottom:10}}></StandartInput>
                <Texts style={{color:GREY, marginBottom:5}}>Asign To</Texts>
                <ListDataLazy renderItem={renderTeams} data={Teams} keyExtractor={item => item.Id} showsVerticalScrollIndicator={false}/>
                
                <TouchableHighlight
                    style={{ marginTop:10, backgroundColor:MAIN , borderRadius:30, height:45, justifyContent:"center",
                    alignItems:"center", }}
                    onPress={saveTask}
                    >
                        <Row style={{alignItems:"center", justifyContent:"center"}}>
                            <Texts style={{color:WHITE}}>SAVE</Texts>

                        </Row>
                </TouchableHighlight>
            </ContainerBox>
        </RBSheet>
        <Alert ref={alert}
            onCancel={()=> {alert.current.hide()}}
            onConfirm={deletebatch}
        >
            <Texts style={{fontSize:18, color:GREY}}>Item selected will be removed</Texts>
         </Alert>
    </Aux>

});

const styleAll = StyleSheet.create({
    welcomeText:{
        fontSize:15,
        color:MAIN_SECOND,
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
        fontSize: 30,
        fontWeight: "500",
        flex: 4, 
        flexWrap: 'wrap',
        color:MAIN,
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

const mapStateToProps = state => {
    const { task, screen } = state;
    return {
        screen:screen,
        task:task
    }
}

const mapDispatchToProps = { screenLoading, setTaskDetails }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskScreen);
