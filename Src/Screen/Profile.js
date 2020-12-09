import React, { memo, useEffect, useState } from 'react'
import Aux from '../Components/Auxx';
import Foundation from '../Components/Foundation';
import { LIGHT, WHITE, MAIN, GREY, MAIN_CONTRAST, MAIN_FOURTH, MAIN_SECOND, MAIN_THIRD } from '../Const/Colors';
import { StatusBar, ImageBackground } from 'react-native';
import Column from '../Components/Column';
import Row from '../Components/Row';
import Texts from '../Components/Text';
import ButtonBlock from '../Components/Button/ButtonBlock';
import ButtonIconCircle from '../Components/Button/ButtonIconCircle';
import { removeToken, setPhoto } from '../Storage/Users';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loggingIn, loggedIn } from '../Actions/Auth';
import Username from './Components/Username';
import { getData, postMultipart } from '../Selectors/Screen';
import { PROFILE, API, BASE_URL, UDPATE_PROFILE } from '../Const/Api';
import { screenLoading, screenLoaded } from '../Actions/Screen';
import DocumentFile from '../Helper/DocumentFile';
import { hideScreenLoader, showScreenLoader } from '../Components/Loader/ScreenLoader';
import Snackbar from 'react-native-snackbar';

const ProfileScreen = memo(({navigation, dispatch, auth, screen, ...props}) => {

    const [profile , setProfile] = useState({
        Id:0,
        Name:"",
        M_Position_Id:"",
        M_User_Id:0,
        Photo:null,
        About:"",
        Position:{
            Id:0,
            Description:"",
            Position:"",
        },
        LoadLocally:false,
        Updating:false
    });

    let controller = new AbortController();

    const doLogout = () => {
        removeToken()
        .then(isRemoved => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        })  
        .catch(err => {

        })
    }

    const loadData = () => {
        getData(PROFILE,controller)
        .then(result => {
            setPhoto(result.Photo);
            setProfile({...result, LoadLocally:false, Updating:false});
            console.log(profile);
        })
        .catch(err => {

        });
        
    }

    useEffect(() => {
        loadData();
        return () => {
            controller.abort()
        }
    }, [])

    // useEffect(() => {
    //     if(!auth.isLoggedIn){
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'LoginScreen' }],
    //         });
    //     } 
    // }, [auth.isLoggedIn])

    if(profile == null){
        return <></>;
    }

    const openDocument = async (type) => {
        let file = await DocumentFile.openDocument(type);

        showScreenLoader("Updating");
        setProfile({...profile, LoadLocally:true, Photo:file.uri, Updating:true});
        
        let files = [];
        files.push(file);
        
        postMultipart(UDPATE_PROFILE, controller, profile, files)
        .then(result => {
            setProfile({...result, LoadLocally:false, Updating:false});
            hideScreenLoader();
        })
        .catch(err => {
            hideScreenLoader();
            Snackbar.show({
                text:err.message,
                duration:Snackbar.LENGTH_SHORT
            })
            setProfile({...profile, Updating:false});
        })

        // console.log(file);
        // attachmentAdd(file);
          
    }

    return <Aux>
        <Foundation style={{backgroundColor:LIGHT}} scrollable = {false}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
            

                <Column style={{ flex:1, height:"100%",}}>
                    <ImageBackground  style={{flex:1,zIndex:1, paddingHorizontal:10, paddingBottom:20}}
                        imageStyle={{ borderBottomLeftRadius:40, borderBottomRightRadius:40, }}
                        source={profile.Photo == null ? require('../Assets/Img/blankphotoo.jpg') : {uri: !profile.LoadLocally ? BASE_URL+profile.Photo : profile.Photo}}>
                        <Column style={{flex:1}}>
                        </Column>
                        <Row style={{justifyContent:"flex-end"}}>
                            <ButtonIconCircle onPress={() => {openDocument(DocumentFile.Galery)}} style={{backgroundColor:"rgba(0,0,0, 0.4)"}} color={WHITE} size={20} icon={'edit'}></ButtonIconCircle>
                        </Row>
                    </ImageBackground>
                    <Column style={{flex:1, backgroundColor:WHITE, paddingHorizontal:15, marginTop:-40}}>
                        <Username style={{color:MAIN, fontSize:30, marginTop:60}}/>
                        <Texts style={{color:GREY, fontSize:16}}>{profile.Position.Position}</Texts>
                        <Texts style={{color:MAIN, fontSize:18, marginTop:20}}>Who Am I ? </Texts>
                        <Texts style={{color:MAIN_THIRD, fontSize:16, marginTop:5}}>{profile.About} </Texts>
                    </Column>
                    <Column>
                        <ButtonBlock onPress={doLogout} rippleColor={MAIN_FOURTH} height={50} fontColor={LIGHT} fontSize={20} fontWeight="500" style={{backgroundColor:MAIN}} uppercase={false}> Log Out</ButtonBlock>
                    </Column>
                </Column>
        </Foundation>
    </Aux>
});


const mapStateToProps = (state) => {
    const { auth, screen } = state;
    console.log(screen.isLoading);
    return {
        auth:auth,
        screen:screen
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    dispatch
}, dispatch)

export default connect(
mapStateToProps,
mapDispatchToProps
)(ProfileScreen);
