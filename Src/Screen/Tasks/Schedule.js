import React, { memo, useState, useEffect, useRef } from 'react'
import Foundation from '../../Components/Foundation';
import { LIGHT,  MAIN_SECOND, WHITE, MAIN, WARNING, MAIN_FOURTH, FONT, MAIN_CONTRAST, GREY, MAIN_THIRD, DARK, DARK_SECOND } from '../../Const/Colors';
// import { StatusBar } from 'expo-status-bar';
import Column from '../../Components/Column';
import Row from '../../Components/Row';
import { StyleSheet, StatusBar, Dimensions, RefreshControl, Modal, TouchableHighlight, TouchableOpacity, View, Animated } from 'react-native'
import ListAvatar from '../../Components/Avatar/ListAvatar';
import CardRectangle from '../../Components/Card/CardRectangle';
import ContainerBox from '../../Components/Container/ContainerBox';
import Texts from '../../Components/Text';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Aux from '../../Components/Auxx';
import ButtonOutline from '../../Components/Button/ButtonOutline';
import { deleteData, getData, postData } from '../../Selectors/Screen';
import { GET_PROJECT, BASE_URL, CREATE_BACKLOG, DELETE_BACKLOG } from '../../Const/Api';
import ButtonBlock from '../../Components/Button/ButtonBlock';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import RBSheet from 'react-native-raw-bottom-sheet';
import ListDataLazy from '../../Components/List/ListDataLazy';
import StandartInput from '../../Components/Input/StandartInput';
import Snackbar from 'react-native-snackbar';
import { getMonth } from '../../Helper/Date';
import ProgressBarLine from '../../Components/ProgressBar/ProgressBarLine';
import { Colors } from 'react-native-paper';
import { hideScreenLoader, showScreenLoader } from '../../Components/Loader/ScreenLoader';
import Alert from '../../Components/Alert/Alert';
import Center from '../../Components/Center';
import Spinner from 'react-native-spinkit';
import Expandable from '../../Components/Expandable/Expandable';
import Checkbox from '../../Components/Checkbox/Checkbox';
import { RandomString } from '../../Helper/General';
import ButtonStandart from '../../Components/Button/ButtonStandart';
import { setSelectedProject } from '../../Actions/Module/Projects';
import { setSelectedTask, setTaskStatusFilter } from '../../Actions/Module/Tasks';
import { screenLoading } from '../../Actions/Screen';
const ScheduleScreen = memo(({ navigation, item, dispatch, project, task,screen,  auth, ...props }) => {
    
    let controller = new AbortController();

    const styleAll = StyleSheet.create({
        welcomeText:{
            fontSize:15,
            color:screen.darkmode ? GREY : MAIN_SECOND,
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
            color:screen.darkmode ? MAIN_THIRD : MAIN,
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

    let form = {
        Name:"",
        M_Project_Id:item
    }
    const refRBSheetBackLog = useRef();
    const refBottomOption = useRef();
    const alert = useRef();
    const win = Dimensions.get("screen");
    
    const [showAddButton, setShowAddButton] = useState(true);
    const [offset, setOffset] = useState(0);
    const [expandAdavance, setExpandAdvance] = useState(false);
    const [animVal, setAnimval] = useState(new Animated.Value(0));


    const loadData = () => {
        const { setSelectedProject, screenLoading } = props; 
        screenLoading(true);
        
        let appendUrl = [];

        task.statusFilter.forEach((e, i) => {
            if(e.selected){
                appendUrl.push(e.value);
            }
        })
        let params = null;
        if(appendUrl.length > 0){
            params = {};
            params.type = appendUrl;
        }
        getData(GET_PROJECT+item, controller, params )
        .then(result => {
            screenLoading(false);
            setSelectedProject(result);
        })
        .catch(err => {
            screenLoading(false);
            // dispatch(screenLoaded([]));
        })
    }

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
          loadData();
        });
        // loadData();
        return () => {
            // focusListener.remove();
            controller.abort();
        }
    }, []);
    // console.log(project.selected);
    if(project.selected.Name == undefined || item != project.selected.Id){
        // showScreenLoader("Loading");
        return <Center><Texts style={{fontSize:15, color:MAIN}}>Loading</Texts>
        <Spinner isVisible={true} size={30} type={"ThreeBounce"} color={MAIN}/></Center>;
    }
    // hideScreenLoader(); 

    const onRefresh = () => {
        loadData()
    }

    const setForm = (field, value) => {
        // console.log(field);
        if(field == "Backlog"){
            form.Name = value;
        }
    }

    const onBackLocPress =() =>{
        refRBSheetBackLog.current.open();
    }


    const saveBacklog = () => {
        postData(CREATE_BACKLOG, controller, form)
        .then(result => {
            console.log(result);
            refRBSheetBackLog.current.close();
            loadData();
        })
        .catch(err => {
            console.log(err.message);
            Snackbar.show({
                text:err.message,
                duration: Snackbar.LENGTH_SHORT
            })
        })
    }
    const teamsData = () => {
        let img = [];
        img = project.selected.Teams.map((e, i) => {
            return e.Photo != null ? {uri: BASE_URL+e.Photo} :  require('../../Assets/Img/blankphoto.png');
        });
        return img;
    };

    const moveToTask = (item) => {
        navigation.navigate("TaskScreen", {
            TaskId:item.Id, 
            TaskName:item.Name,  
            ProjectName:project.selected.Name, 
            Teams:project.selected.Teams,
            IsYours:project.selected.IsYours
            

        })
    }


    const handleScroll = (event)  => {
        setOffset(event.nativeEvent.contentOffset.y);
        if( offset > event.nativeEvent.contentOffset.y){
            setShowAddButton(true);
        } else {
            setShowAddButton(false);
        }
        // toggleAddButton();
    }

    const addTeam = () => {
        navigation.navigate("TaskAddTeamScreen", 
            {
                ProjectId:project.selected.Id, 
                ProjectName:project.selected.Name, 
                Teams:project.selected.Teams
            }
        )
    }

    const showMine = () => {
        navigation.navigate("MyTasksScreen", {
            projectId:project.selected.Id, 
            projectName:project.selected.Name,
            activeSprint:project.selected.ActiveSprint,
            isYours:project.selected.IsYours
        })
    }

    const toggleAddButton = (toggle) => {
        if(showAddButton && project.selected.IsYours){
            Animated.timing(animVal,
                {
                    toValue:1,
                    duration:300,
                    useNativeDriver:false        
                }
            )
        } else {
            Animated.timing(animVal,
                {
                    toValue:0,
                    duration:300,
                    useNativeDriver:false        
                }
            )
        }
    }

    const onRemove = () => {
        refBottomOption.current.close();
        alert.current.show();
    }

    const onConfirm = () => {
        deleteData(DELETE_BACKLOG+task.selected.Id, controller)
        .then(result=> {
            alert.current.hide();
            loadData();
        })
        .catch(err => {
            alert.current.hide();
            Snackbar.show({
                text:err.message,
                duration:Snackbar.LENGTH_SHORT
            })
        })
    }

    const onItemLongPress = (item) => {
        const { setSelectedTask } = props;
        setSelectedTask(item);
        refBottomOption.current.open();
    }

    const onExpand = () => {
        setExpandAdvance(!expandAdavance);
    }

    const onValueChange = (item, selected) => {
        const { setTaskStatusFilter } = props;
        let newData = [];
        task.statusFilter.forEach((e, i) => {
            if(item.value == e.value){
                e.selected = selected;
            }
            newData.push(e);
        })
        setTaskStatusFilter(newData);

    }


    let startDate = new Date(project.selected.StartDate);
    let endDate = new Date(project.selected.EndDate);

    const renderBacklog = ({item, index}) => {
        let user = 0;
        let i = index;
        let lastIndex = (project.selected.Backlogs.length - 1) == i;
        return <Column key ={item.Id+i} style={{paddingBottom:lastIndex ? 70 : 0,paddingHorizontal:10, backgroundColor:screen.darkmode ? DARK_SECOND : WHITE }}>
            <CardRectangle padding={10} rippleColor={MAIN_FOURTH} style={{ width:"100%", backgroundColor:screen.darkmode ? DARK_SECOND : WHITE, borderBottomWidth:0.5, borderColor:screen.darkmode ? DARK : MAIN_FOURTH}} onLongPress={() => {onItemLongPress(item)}} onPress = {() => moveToTask(item)}>
                    
                <Row style={{alignItems:"center", zIndex:1, }}>
                    <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:screen.darkmode ? MAIN_THIRD : MAIN,fontSize:20, fontWeight:"500"}}>{item.Name}</Texts>
                   
                </Row>
                <Row style={{justifyContent:"space-between", alignItems:"center", zIndex:1}}>
                    <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:screen.darkmode ? WHITE : MAIN_THIRD,fontSize:13, marginBottom:5}}>{item.Created}</Texts>
                </Row>
                {
                   item.Tasks.map((task, i) => {
                        let showName = false;
                        if(task.M_User_Id != user){
                            user = task.M_User_Id;
                            showName = true;
                        } else {
                            showName = false;
                        }
                        
                        let color = MAIN_SECOND;
                        let status = "New";
                        if(task.Type == 2){
                            color = MAIN;
                            status = "Plan";
                        } else if( task.Type == 3){
                            color = Colors.red300;
                            status = "Doing";
                        } else if(task.Type == 4) {
                            color = Colors.blue300;
                            status = "Check";
                        } else if(task.Type == 5){
                            color = MAIN_CONTRAST;
                            status = "Done";
                        }

                        return <Column key ={task.Name+i}>
                            {showName ? <Texts numberOfLines={3} ellipsizeMode='tail' style={{ color:screen.darkmode ? MAIN_FOURTH : MAIN_SECOND, fontSize:16, marginLeft:20, marginTop:(i > 0 && showName) ? 10 : 0}}>{task.AssignTo}</Texts> : null}
                            <Row style={{width:"93%", alignItems:"center"}}>
                                <Icon name={"dot-single"} color={GREY} style={{marginLeft:7}}></Icon>
                                {/* <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:GREY, marginLeft:10, fontSize:16}}>- </Texts> */}
                                <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:GREY, fontSize:16, width:"82%"}}>{task.Name} </Texts>
                                <Icon name={"dot-single"} color={color} style={{marginLeft:7}}></Icon>
                                <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:color, fontSize:13}}>{status} </Texts>
                            </Row>

                                
                        </Column> 
                   }) 
                }
                {/* <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:FONT}}>{item.Description}</Texts> */}
               
            </CardRectangle>
        </Column>
    }

    return <Aux>
        <Foundation style={{backgroundColor:screen.darkmode ? DARK : LIGHT}} scrollable = {false}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
            <ContainerBox style={{marginTop:40, flex:1}}>
                <Column  style={{ paddingHorizontal:20}}> 
                    <Row style={{justifyContent:"space-between"}}>
                        <Texts numberOfLines={2} ellipsizeMode='tail' style={styleAll.nameText}>{project.selected.Name}</Texts>
                        {/* <Center style={{flex:1}} align="flex-end">
                            <ButtonIconRounded size={24} rippleColor={WHITE} style={{elevation:2, backgroundColor:MAIN} } color={WHITE} icon="plus" onPress={() => navigation.navigate("TaskScreen")} >
                            </ButtonIconRounded>
                        </Center> */}
                    </Row>

                    {/* <Texts numberOfLines={2} ellipsizeMode='tail' style={styleAll.nameText}>{project.selected..Description}</Texts> */}
                    <Texts style={styleAll.welcomeText}>
                        {startDate.getDate()} {getMonth(startDate.getMonth() + 1)} {startDate.getFullYear()} | {endDate.getDate()} {getMonth(endDate.getMonth() + 1)} {endDate.getFullYear()} 
                    </Texts>
                    {/* <Link to = "/TaskScreen">aaaa</Link> */}
                    <Row style={{justifyContent: 'space-between', paddingVertical:10, alignItems:"center"}}>
                        
                        <ListAvatar maxShow={3} data={teamsData()}  style={{ paddingLeft:20, backgroundColor:WHITE, borderRadius:48}} addButton={project.selected.IsYours} addButtonPress={addTeam}/>
                        <Row style={{alignItems:"center"}}>
                            <ButtonOutline borderColor={MAIN_CONTRAST} style={{paddingHorizontal:10, borderRadius:20}} uppercase={false} fontColor={MAIN_CONTRAST} rippleColor={MAIN_CONTRAST} height={30} onPress={showMine}>
                                Show Mine
                            </ButtonOutline>
                            {/* <ButtonIconCircle icon={"chevron-small-down"} size={24}>
                               
                            </ButtonIconCircle> */}
                        </Row>
                    </Row>
                    
                </Column>
                <Expandable toggle={expandAdavance} maxHeight={110} marginBottom ={-10} paddingHorizontal={20} paddingVertical={10} style={{backgroundColor:screen.darkmode ? DARK : WHITE}} >
                    <Row style={{justifyContent:"space-between", alignItems:"center"}}>
                        <Row style={{alignItems:"center"}}>
                            <Icon name={"funnel"} color={screen.darkmode ? GREY : MAIN} />
                            <Texts style={{color:screen.darkmode ? GREY :MAIN, fontSize:20, marginLeft:5}}>Filters</Texts>
                        </Row>
                        <ButtonStandart onPress={onRefresh} style={{paddingHorizontal:10, borderRadius:20, backgroundColor:MAIN_CONTRAST}} uppercase={false} fontColor={WHITE} rippleColor={MAIN_CONTRAST} height={30}>Go</ButtonStandart>
                    </Row>
                    <Texts style={{color:screen.darkmode ? GREY : MAIN_SECOND, fontSize:15, marginTop:5}}>Status</Texts>
                    <Row style={{marginTop:5}}>
                        {
                            task.statusFilter.map((e, i) => {
                                
                                return   <Checkbox textColor={screen.darkmode ? GREY : MAIN_SECOND} text={e.text} key={RandomString(10)} item={e} checkedColor={MAIN_CONTRAST} isChecked={e.selected} onValueChange={onValueChange}>

                                </Checkbox>  
                            })
                        }
                    </Row>
                </Expandable>
                <Column align={"center"} style={{justifyContent:"center", marginBottom:-14, zIndex:1, marginHorizontal:20}}>
                    <ButtonIconCircle onPress={onExpand} rippleColor={LIGHT} width={24} style={{backgroundColor:screen.darkmode ? MAIN_SECOND : MAIN}} size={16} icon={!expandAdavance ? "chevron-small-down" : "chevron-small-up"} color={WHITE}/>
                </Column>
                <ProgressBarLine percentage={project.selected.ProjectDone} color={MAIN_CONTRAST} thick={2}/>
                <Column style={{flex:1, backgroundColor:screen.darkmode ? DARK_SECOND :WHITE}}> 
                  
                    <ListDataLazy 
                        style={{paddingBottom:50}}
                        refreshControl={<RefreshControl progressBackgroundColor={screen.darkmode ? DARK_SECOND : WHITE} colors={screen.darkmode ? [GREY] : [MAIN_SECOND]} refreshing={screen.loading} onRefresh={onRefresh} />} 
                        alwaysBounceVertical={true} 
                        showsVerticalScrollIndicator={false} 
                        style={{flex:1}} 
                        contentContainerStyle={{flexGrow: 1}} 
                        renderItem={renderBacklog} 
                        data = {project.selected.Backlogs} 
                        keyExtractor={item => item.Id}
                        onScroll={handleScroll}
                    />
                </Column>

            </ContainerBox> 
        </Foundation>
        { (project.selected.IsYours && showAddButton ) ? <Column style={{ borderRadius:30, position:"absolute", bottom:80, right:10}}>
            <ButtonBlock icon="plus" onPress={onBackLocPress} paddingHorizontal={20} rippleColor={MAIN} fontColor={ screen.darkmode ? WHITE : MAIN} height={45} fontSize={18}  style={{elevation:5, backgroundColor:screen.darkmode ? DARK_SECOND : WHITE , borderRadius:30}} uppercase={false}>Story</ButtonBlock>
        </Column> : null}
       
        <RBSheet
            ref={refRBSheetBackLog}
            scrollToOverflowEnabled={true}
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
            height={win.height-400}
        >
            
            <ContainerBox style={{paddingTop:10, paddingBottom:20,flex:1, paddingHorizontal:15,}}>
            <Texts style={{color:MAIN, fontSize:30, fontWeight:"500", marginBottom:10}}>Set Your Story Name</Texts>
                <StandartInput field={"Backlog"} multiline={true} onValueChange={setForm}  style={{paddingHorizontal:10, borderRadius:10, backgroundColor:"rgba(0,0,0, 0.1)"}}></StandartInput>
               
                <TouchableHighlight
                    style={{ marginTop:10, backgroundColor:MAIN , borderRadius:30, height:45, justifyContent:"center",
                    alignItems:"center", }}
                    onPress={saveBacklog}
                    >
                        <Row style={{alignItems:"center", justifyContent:"center"}}>
                            <Texts style={{color:WHITE}}>SAVE</Texts>

                        </Row>
                </TouchableHighlight>
            </ContainerBox>
        </RBSheet>

        <RBSheet
        ref={refBottomOption}
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
        height={170}
        >
          <ContainerBox style={{paddingTop:10, paddingBottom:20,flex:1, }}>

            <TouchableOpacity 
              style={{ marginTop:10, height:45, paddingHorizontal:15, justifyContent:"center" }}
              onPress={onRemove} >
                <Row style={{alignItems:"center", }}>
                  <Icon size={24} name={"trash"} color={MAIN}></Icon>
                  <Texts style={{marginLeft:15, fontSize:18, color:MAIN}}>Remove</Texts>
                </Row>
                
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ marginTop:10,  height:45,paddingHorizontal:15, justifyContent:"center" }}
              onPress={() => {refBottomOption.current.close()}} >
                <Row style={{alignItems:"center"}}>
                  <Icon size={24} name={"cross"} color={MAIN}></Icon>
                  <Texts style={{marginLeft:15, fontSize:18, color:MAIN}}>Close</Texts>
                </Row>
                
            </TouchableOpacity>
          </ContainerBox>

      </RBSheet>
      <Alert ref={alert}
        onCancel={()=> {alert.current.hide()}}
        onConfirm={onConfirm}
      >
        {task.selected.Name != undefined ? <Texts style={{fontSize:18, color:GREY}}>Item {task.selected.Name} will be removed</Texts> : null}
      </Alert>
    </Aux>
    
})
const mapStateToProps = (props ) => {
    const{ project, task, screen} = props;
    return {
        project: project,
        task:task,
        screen:screen
    }
}

const mapDispatchToProps = { setSelectedProject, setSelectedTask, screenLoading, setTaskStatusFilter }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleScreen);

