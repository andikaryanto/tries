import React, { memo, useState, useEffect } from 'react';
import Aux from '../../Components/Auxx';
import Foundation from '../../Components/Foundation';
import { StatusBar, RefreshControl, StyleSheet } from 'react-native';
import ContainerBox from '../../Components/Container/ContainerBox';
import Column from '../../Components/Column';
import Row from '../../Components/Row';
import Texts from '../../Components/Text';
import ListDataLazy from '../../Components/List/ListDataLazy';
import { MAIN_SECOND, WHITE, MAIN, LIGHT, MAIN_FOURTH, GREY } from '../../Const/Colors';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import { getDataList, postData } from '../../Selectors/Screen';
import { PROFILES, BASE_URL, CREATE_PROJECT_ADD_TEAM } from '../../Const/Api';
import AvatarSelectable from '../../Components/Avatar/AvatarSelectable';
import Snackbar from 'react-native-snackbar';
import { hideScreenLoader, showScreenLoader } from '../../Components/Loader/ScreenLoader';

const TaskAddTeamScreen = memo(({route, navigation, ...props}) => {
    const { ProjectId, ProjectName, Teams } = route.params

    let controller = new AbortController();

    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState([]);
    const [addedUsers, setAddedUser] = useState([]);

    const onRefresh = () => {
        loadTeam();
    }

    const loadTeam = () =>{
        setRefreshing(true);
        getDataList(PROFILES, controller, {exceptme:true}
        ).then(result => {
            result.forEach(element => {
                element.isSelected = false;
            });
            setUser(result);
            setRefreshing(false);
        })
        .catch(error => {
            setRefreshing(false);
        });

        return () => {
            // console.log("should abort");
            controller.abort();
        }
    }

    useEffect(() => {
        loadTeam();

        setAddedUser(Teams);
        return () => {
            controller.abort();
        }
    },[]);

    const avatarSelect = (item, selected) => {
        
        let newuser = [];
        if(selected){
            if(addedUsers.find(x => x.Id == item.Id) ==  undefined){
                
                // let u = users.find(x => x.Id == item.Id)
                // if(u != undefined){
                    
                // }

                addedUsers.push(item);
                addedUsers.forEach(element => {
                    newuser.push(element);
                });
                // onValueChange(newuser);
                setAddedUser(newuser);
            }
        } else {
            let i = addedUsers.findIndex(x => x.Id == item.Id);
            if( i > -1 ){

                addedUsers.splice(i, 1);
                addedUsers.forEach(element => {
                    newuser.push(element);
                });
                // onValueChange(newuser);
                setAddedUser(newuser);
            }
        }

    }

    const addTeams = () => {
        showScreenLoader("Adding Team");
        let ids = addedUsers.map((e ,i) => {
            return e.M_User_Id;
        });

        let body = {
            TeamIds : ids
        };

        // console.log(body);

        postData(CREATE_PROJECT_ADD_TEAM+ProjectId, controller, body)
        .then(res => {
            hideScreenLoader();
            navigation.goBack();
            // loadData();
            
        })
        .catch(err => {
            hideScreenLoader();
            Snackbar.show({
                text:err.message,
                duration:Snackbar.LENGTH_SHORT   
            })
        })
    }

    const renderTeams = ({item, index}) => {
        let isSelected = addedUsers.findIndex(x => x.Id == item.Id) > -1;
        return <Row style={{padding:5, alignItems:"center", marginBottom:5, }} >

        <AvatarSelectable selected={isSelected} onSelect={avatarSelect} data={item} containerStyle={{marginRight:10, marginTop:(index == 0) ? 15 : 0}} source={{uri:BASE_URL+item.Photo}}></AvatarSelectable>
       
        <Column>
            <Texts style={{color:MAIN, fontSize:20}}>{item.Name}</Texts>
            <Texts style={{color:GREY, fontSize:15}}>{item.Position}</Texts>
        </Column>
    </Row>
    }

    return <Aux>
        <Foundation style={{backgroundColor:LIGHT}} scrollable = {false}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="dark-content" hidden={false} translucent={true}/>
            <ContainerBox style={{marginTop:40, flex:1}}>
                <Column  style={{ paddingHorizontal:20}}> 
                    <Row style={{justifyContent:"space-between"}}>
                        <Texts numberOfLines={2} ellipsizeMode='tail' style={styleAll.nameText}>{ProjectName}</Texts>
                     
                    </Row>
                    <Texts style={{color:MAIN_SECOND, fontSize:15}}>Team will help you get the project done on time.</Texts>
                    <Texts style={{color:MAIN_SECOND, fontSize:15}}>Here's your available team.</Texts>
                    <Row style = {{ zIndex:1, marginBottom:-24, justifyContent: 'flex-end'}}>
                        {/* <ButtonIconCircle  rippleColor={WHITE} style={{backgroundColor:MAIN, elevation:0,  }} color={WHITE} size ={20} icon={"plus"} onPress={() => dispatch(screenLoading())}></ButtonIconCircle> */}
                        
                        <ButtonIconCircle  rippleColor={WHITE} style={{backgroundColor:MAIN, elevation:0,  }} color={WHITE} size ={20} icon={"save"} onPress={addTeams}></ButtonIconCircle>
                    </Row>
                </Column>
                
                <Column style={{flex:1, backgroundColor:WHITE, height:"100%", paddingHorizontal:10}}> 
                
                    <ListDataLazy 
                        
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
                        alwaysBounceVertical={true} 
                        showsVerticalScrollIndicator={false} 
                        style={{flex:1}} 
                        contentContainerStyle={{flexGrow: 1}} 
                        renderItem={renderTeams} 
                        data = {user.length > 0 ? user : []} 
                        keyExtractor={item => item.Id}
                    />
                </Column>

            </ContainerBox>        
        </Foundation>
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

export default TaskAddTeamScreen;