import React, { memo, useEffect, useState, useRef } from 'react';
import ListAvatar from '../../../Components/Avatar/ListAvatar';
import { getDataList } from '../../../Selectors/Screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PROFILES, BASE_URL } from '../../../Const/Api';
import RBSheet from 'react-native-raw-bottom-sheet';
import ContainerBox from '../../../Components/Container/ContainerBox';
import Texts from '../../../Components/Text';
import { LIGHT, MAIN, GREY, MAIN_SECOND, MAIN_CONTRAST } from '../../../Const/Colors';
import { Dimensions } from 'react-native';
import Row from '../../../Components/Row';
import Avatar from '../../../Components/Avatar/Avatar';
import Column from '../../../Components/Column';
import LisDataLazy from '../../../Components/List/ListDataLazy';
import { View } from 'native-base';
import ButtonBlock from '../../../Components/Button/ButtonBlock';
import AvatarSelectable from '../../../Components/Avatar/AvatarSelectable';
import { add } from 'react-native-reanimated';``
import ButtonOutline from '../../../Components/Button/ButtonOutline';

const ProjectTeamCreation = memo(({onValueChange,   ...props}) => {

    const [users, setUser] = useState([]);

    const refRBSheet = useRef();
    const refRBSheetTeams = useRef();
    const win = Dimensions.get("screen");
    
    let controller = new AbortController();
    
    useEffect(() => {
        getDataList(PROFILES, controller, {exceptme:true}
        ).then(result => {
            result.forEach(element => {
                element.isSelected = false;
            });
            setUser(result);
        })
        .catch(error => {

        });

        return () => {
            controller.abort();
        }
    },[]);

    const imageData = () => {
        let img = [];
        img = users.filter((el) => el.isSelected).map((e, i) => {
            return {uri:BASE_URL+e.Photo};
        });
        return img;
    }

    const addTeam = () => {
       
        refRBSheet.current.open()
    };

    const showTeams = () => {
       
        refRBSheetTeams.current.open()
    };

    const avatarSelect = (item, selected) => {
        
        let newuser = [];

        newuser = users.map((e, i) => {
            if(item.Id == e.Id){
                e.isSelected = !e.isSelected
            }
            return e;
        });
        onValueChange(users);
        setUser(newuser);

    }
    const renderList = ({item, i}) => {
        // return <Avatar canSelect={false} containerStyle={{marginRight:10}} source={{uri:BASE_URL+item.Photo}}></Avatar>
        return <Row style={{padding:5, alignItems:"center", marginBottom:5}} >

                        <AvatarSelectable selected={item.isSelected} onSelect={avatarSelect} data={item} containerStyle={{marginRight:10}} source={{uri:BASE_URL+item.Photo}}></AvatarSelectable>
                       
                        <Column>
                            <Texts style={{color:MAIN, fontSize:20}}>{item.Name}</Texts>
                            <Texts style={{color:GREY, fontSize:15}}>{item.Position}</Texts>
                        </Column>
                    </Row>
    }

    const renderTeams = ({item, i}) => {
        // return <Avatar canSelect={false} containerStyle={{marginRight:10}} source={{uri:BASE_URL+item.Photo}}></Avatar>
        return <Row style={{padding:5, alignItems:"center", marginBottom:5}} >

                        <Avatar containerStyle={{marginRight:10}} source={{uri:BASE_URL+item.Photo}}></Avatar>
                       
                        <Column>
                            <Texts style={{color:MAIN, fontSize:20}}>{item.Name}</Texts>
                            <Texts style={{color:GREY, fontSize:15}}>{item.Position}</Texts>
                        </Column>
                    </Row>
    }
    // return null;
    return <>
        <Row style={{justifyContent:"space-between", paddingHorizontal:15, alignItems:"center"}}>
            <ListAvatar maxShow={3} containerStyle={{ paddingVertical:10, }} data={imageData()} addButton={true} addButtonPress={addTeam}/>
            <ButtonOutline borderColor={MAIN_CONTRAST} style={{paddingHorizontal:10, borderRadius:20}} uppercase={false} fontColor={MAIN_CONTRAST} rippleColor={MAIN_CONTRAST} height={30} onPress={showTeams}>
                Show Teams
            </ButtonOutline>
        </Row>
        <RBSheet
            ref={refRBSheet}
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
            height={win.height - 130}
        >
            
            <ContainerBox style={{paddingTop:10, paddingBottom:20,flex:1, paddingHorizontal:15,}}>
                <Texts style={{color:MAIN, fontSize:35, fontWeight:"500"}}>Choose Team</Texts>
                <Texts style={{color:MAIN_SECOND, fontSize:15}}>Team will help you get the project done on time.</Texts>
                    <Column style={{marginTop:15, alignItems:"flex-start"}} >
                        <LisDataLazy renderItem={renderList} data={users} keyExtractor={item => item.Id}/>
                    </Column>
            </ContainerBox>
        </RBSheet>

        <RBSheet
            ref={refRBSheetTeams}
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
            height={win.height - 130}
        >
            
            <ContainerBox style={{paddingTop:10, paddingBottom:20,flex:1, paddingHorizontal:15,}}>
                <Texts style={{color:MAIN, fontSize:35, fontWeight:"500"}}>Here's Your Teams</Texts>
                <Texts style={{color:MAIN_SECOND, fontSize:15}}>Team will help you get the project done on time.</Texts>
                    <Column style={{marginTop:15, alignItems:"flex-start"}} >
                        <LisDataLazy renderItem={renderTeams} data={users.filter((el) => el.isSelected)} keyExtractor={item => item.Id}/>
                    </Column>
            </ContainerBox>
        </RBSheet>
    </>;
});

export default ProjectTeamCreation;
// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     dispatch
// }, dispatch)

// export default connect(
//     null,
// mapDispatchToProps
// )(ProjectTeamCreation);