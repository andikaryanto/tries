import React, { memo, useEffect, useState, useRef } from 'react';
import { WHITE, MAIN, MAIN_FOURTH, FONT, WARNING, MAIN_CONTRAST, MAIN_SECOND, GREY, LIGHT, DARK_SECOND, MAIN_THIRD, DARK } from '../../Const/Colors';
import Row from '../../Components/Row';
import Texts from '../../Components/Text';
import CardRectangle from '../../Components/Card/CardRectangle';
import { getDataList, deleteData } from '../../Selectors/Screen';
import { GET_PROJECTS, DELETE_PROJECT } from '../../Const/Api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RefreshControl, View, Text, StyleSheet, PanResponder, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import ListSwipeable from '../../Components/List/ListSwipeable';
import { screenLoaded, screenLoading } from '../../Actions/Screen';
import { Colors } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import ContainerBox from '../../Components/Container/ContainerBox';
import Icon from 'react-native-vector-icons/Entypo';
import Alert from '../../Components/Alert/Alert';
import Center from '../../Components/Center';
import Snackbar from 'react-native-snackbar';
import { showScreenLoader, hideScreenLoader } from '../../Components/Loader/ScreenLoader';
import ListDataLazy from '../../Components/List/ListDataLazy';
import { RandomString } from '../../Helper/General';
import { deleteProject, setProjects, setSelectedProject } from '../../Actions/Module/Projects';

const ProjectList = memo(({dispatch, navigation, projects, screen, data, render, ...props}) => {
 

    let controller = new AbortController();
    const bottomSheet = useRef();
    const alert = useRef();
    const win = Dimensions.get("screen");

    const onRefresh = () => {
        loadData()
    }

    const loadData = () => {

      const { setProjects, screenLoading } = props
      screenLoading(true);
      getDataList(GET_PROJECTS, controller
      ).then(result => {
          screenLoading(false);
          setProjects(result);
      })
      .catch(err => {
        console.log(err.message);
          screenLoading(false);
      });
    }

    useEffect(() => {
        loadData();
        return () => {
            controller.abort();
        }
    }, []);

    const QuickActions = ({item}) => {
        return (
          <View style={styles.qaContainer}>
            {/* <View style={styles.qaContainer}> */}
            <View style={[styles.button, styles.button1]}>
              <Text style={[styles.buttonText, styles.button1Text]}>Archive</Text>
            </View>
            {/* </View> */}
            {/* <View style={styles.qaContainer}> */}
            <View style={[styles.button, styles.button2]}>
              <Text style={[styles.buttonText, styles.button2Text]}>Snooze</Text>
            </View>
            {/* </View> */}
            {/* <View style={styles.qaContainer}> */}
            <View style={[styles.button, styles.button3]}>
              <Text style={[styles.buttonText, styles.button3Text]}>Delete</Text>
              {/* </View> */}
            </View>
          </View>
        );
      }

    const onRemove = (e) => {
      bottomSheet.current.close();
      alert.current.show();
    } 

    const confirmRemove = () => {
      
      const { deleteProject } = props
      alert.current.hide();
      showScreenLoader("Removing")
      deleteData(DELETE_PROJECT+projects.selected.Id, controller)
      .then(result => {
        hideScreenLoader();
        // loadData();
        Snackbar.show({
          text:projects.selected.Name + " successfully removed",
          duration:Snackbar.LENGTH_SHORT
        });
        
        deleteProject(projects.selected);
      })
      .catch(err => {
        hideScreenLoader();
        Snackbar.show({
          text:err.Message,
          duration:Snackbar.LENGTH_SHORT
        });
      });
    }

    const itemLongPress = (item) => {
      const { setSelectedProject } = props
      setSelectedProject(item);
      bottomSheet.current.open();
    }

    
    

    const renderList = ({item, i}) => {
      let color = MAIN_CONTRAST;

      if(item.StrStatus == "New")
          color = MAIN_SECOND;
      else if(item.StrStatus == "In Progress")
          color = WARNING;
      else if(item.StrStatus == "Suspended")
          color = GREY;
      

      return <Row  key ={RandomString(10)}>                                        
          <CardRectangle  
          padding={10}
            rippleColor={MAIN_FOURTH} 
            style={{ flex:3,backgroundColor:screen.darkmode ? DARK_SECOND : WHITE, borderBottomColor: screen.darkmode ? DARK : MAIN_FOURTH, borderBottomWidth: 0.5}} 
            onPress={() => navigation.navigate("ProjectEachScreen", {projectId:item.Id, projectName:item.Name, isYours:item.IsYours })}
            onLongPress={() => itemLongPress(item)}
          >
              <Row style={{alignItems:"center", justifyContent: 'space-between', marginBottom:10}}>
                  <Texts style={{color:color}}>{item.StrStatus}</Texts>
                  {/* <ButtonIconCircle rippleColor={MAIN} color={MAIN} icon={"dots-three-vertical"} width={32}>

                  </ButtonIconCircle> */}
                  
                  
              </Row>
              <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:screen.darkmode ? MAIN_THIRD : MAIN,fontSize:20, fontWeight:"500", marginBottom:5}}>{item.Name}</Texts>
              <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:screen.darkmode ? GREY : MAIN_SECOND}}>{item.Description}</Texts>
              <Row style={{alignItems:"center", justifyContent: 'flex-end', marginTop:10}}>
                  <Texts style={{color:GREY}}> Created By</Texts>
                  <Texts style={{color:screen.darkmode ? MAIN_THIRD : MAIN}}> {item.CreatedBy}</Texts>
              </Row>
          </CardRectangle>
      </Row>
    }

    return <>
      <ListDataLazy
      // inverted={true} 
        refreshControl={<RefreshControl progressBackgroundColor={screen.darkmode ? DARK_SECOND : WHITE} colors={screen.darkmode ? [GREY] : [MAIN_SECOND]} refreshing={screen.loading} onRefresh={onRefresh} />} 
        alwaysBounceVertical={true} 
        showsVerticalScrollIndicator={false} 
        renderItem={renderList} 
        data={projects.list} 
        // maxSwipeDistance={240}
        // renderQuickActions={QuickActions}
        keyExtractor ={item => item.Id} 
        style={{flex:1, }} 
        contentContainerStyle={{flexGrow: 1}} 
        isLoading={screen.loading}
      />
      <RBSheet
        ref={bottomSheet}
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
              onPress={() => {bottomSheet.current.close()}} >
                <Row style={{alignItems:"center"}}>
                  <Icon size={24} name={"cross"} color={MAIN}></Icon>
                  <Texts style={{marginLeft:15, fontSize:18, color:MAIN}}>Close</Texts>
                </Row>
                
            </TouchableOpacity>
          </ContainerBox>

      </RBSheet>
      <Alert ref={alert}
        onCancel={()=> {alert.current.hide()}}
        onConfirm={confirmRemove}
      >
        { projects.selected.Name != undefined ? <Texts style={{fontSize:18, color:GREY}}>Item {projects.selected.Name} will be removed</Texts> : null}
      </Alert>
    </>
});

const mapStateToProps = (state) => {
    const { auth, screen, project } = state;
    return {
        auth:auth,
        projects:project,
        screen:screen
    }
}

const mapDispatchToProps = { deleteProject, setProjects, setSelectedProject, screenLoading }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lightGreen100,
  },
  item: {
    backgroundColor: '#E2EBFF',
    // backgroundColor: '#BFD2FF',
    height: 80,
    flexDirection: 'row',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 5
  },
  messageContainer: {},
  name: {
    fontSize: 16,
    color: '#100023',
    fontWeight: 'bold',
  },
  subject: {
    fontSize: 14,
    color: '#100023',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    color: '#100023',
  },
  itemSeparator: {
    height: 10,
    backgroundColor: '#333333',
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5
  },
  button: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0.1,
  },
  button1: {
    backgroundColor: '#fbe2ff',
  },
  button2: {
    backgroundColor: '#ffeee2',
  },
  button3: {
    backgroundColor: '#fffde2',
  },
  buttonText: {
    color: '#9eb5e6',
    fontWeight: 'bold',
  },
  button1Text: {
    color: '#560061',
  },
  button2Text: {
    color: '#7A3100',
  },
  button3Text: {
    color: '#423900',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});