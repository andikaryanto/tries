import React, { memo, useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LIGHT, MAIN, MAIN_FOURTH, WHITE, MAIN_SECOND, GREY, MAIN_CONTRAST } from '../../Const/Colors';
import { ImageBackground, StyleSheet, Dimensions,  StatusBar} from 'react-native';
import ContainerBox from '../../Components/Container/ContainerBox';
import Texts from '../../Components/Text';
import Column from '../../Components/Column';
import Row from '../../Components/Row';
import Box from '../../Components/Box';
import Foundation from '../../Components/Foundation';
import { Colors } from 'react-native-paper';
import Aux from '../../Components/Auxx';
import Footer from '../../Components/Footer/Footer';
import ButtonBlock from '../../Components/Button/ButtonBlock';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import { Link } from '@react-navigation/native';
import { Authenticate } from '../../Selectors/Auth';
import Toast from '../../Components/Toast';
import FloatingInput from '../../Components/Input/FloatingInput';
import { showScreenLoader, hideScreenLoader } from '../../Components/Loader/ScreenLoader';
import Snackbar from 'react-native-snackbar';
import messaging from '@react-native-firebase/messaging';
import { postData } from '../../Selectors/Screen';
import { UDPATE_TOKEN } from '../../Const/Api';

const LoginScreen = memo(({dispatch, navigation, auth, ...props}) => {
    const win = Dimensions.get("screen");

    let controller = new AbortController();

    const styles = StyleSheet.create({
       
        background: {
            width: win.width,
            height: win.height,
            // flexGrow:1
            
        },
        darkenBack: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
        conatiner:{
            width: win.width,
            // height: win.height,
            backgroundColor:"white",
            marginTop:20,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            paddingTop:20,
            paddingHorizontal:20,
            flex:1
            
        },
        rowLogo:{
            marginTop:50
        },  
        logo : {
            width:70,
            height:70,
        }
    });

    const [form, setForm] = useState({username:"", password:"", isSubmited:""})

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [isSubmited, setIsSubmited] = useState(false);

    const updateToken = (token) => {
        postData(UDPATE_TOKEN, controller, {Token : token})
        .then(result => {
            
        })
    }

    const doLogin = () => {
        setForm({...form, isSubmited:true});
        if(!auth.isLoggingIn && form.username != "" && form.password != ""){

            showScreenLoader("Signing In");
            Authenticate({username:form.username, password:form.password}, controller)
            .then(result => {
                if(result.isLoggedIn){
                    messaging()
                    .getToken()
                    .then(token => {
                      updateToken(token);
                    });

                    // dispatch(loggedIn(result.isLoggedIn));
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'ProjectsScreen' }],
                    });
                } else {

                    // dispatch(loggedIn(false,result.message));
                    // dispatch(loggedIn(false,""));
                }

                hideScreenLoader();
            })
            .catch(err => {
                    hideScreenLoader();
                    Snackbar.show({
                        text:err.message,
                        duration:Snackbar.LENGTH_SHORT
                    })
                    // dispatch(loggedIn(false,error.message));
                    // dispatch(loggedIn(false,""));
            });

        }
    }
    

    let footer = <Footer backgroundColor={WHITE} style={{padding:10}} >
                
                <Column align="center" style={{paddingTop:5, paddingBottom:10}}>
                    <Texts>Don't Have An Account ? <Link style={{color:MAIN_CONTRAST}} to="/RegisterScreen">Register</Link></Texts>
                </Column>
            </Footer>;

    return <Aux>
            <Foundation style={{backgroundColor:LIGHT}} scrollable = {true} footer={footer} isLoading={auth.isLoggingIn}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
               
                    <Column style={{flex:1}}>
                        <ImageBackground 
                            style={styles.background}
                            imageStyle={{  }}
                            source={require('../../Assets/Img/background.jpg')}
                        >
                           
                            <Column style={{paddingLeft:40}}> 
                                <Row style={styles.rowLogo}>

                                    <ImageBackground 
                                        style={styles.logo}
                                        imageStyle={{ borderRadius:15, borderColor:MAIN_FOURTH, borderWidth:1 }}
                                        source={require('../../Assets/Img/logo.png')}
                                    />
                                    </Row>
                                    <Box style={{marginTop:15}}>
                                    <Texts style={{color:WHITE, fontSize:40}}>Update Your Daily Work</Texts>
                                </Box>
                            </Column>
                            <ContainerBox style={styles.conatiner}>
                                <Texts style={{color:MAIN_SECOND, fontSize:30}}>Login Account</Texts>
                                <FloatingInput underlineColor={GREY} style = {{backgroundColor:"transparent"}}
                                    key={"username"}
                                    label={"Username"}
                                    textContentType={"username"}
                                    // value={form.username}
                                    onChangeText={username => {
                                        setForm({username:username, password:form.password, isSubmited:false});
                                        // setIsSubmited(false);
                                    }}
                                    errorStyle={{marginLeft:5, color:Colors.red500, fontSize:13}}
                                    errorText={form.username == "" && form.isSubmited ? "Username cant be empty" : ""}
                                />
                                <FloatingInput underlineColor={GREY} style = {{backgroundColor:"transparent"}}
                                    key={"password"}
                                    label={"Password"}
                                    // value={form.password}
                                    textContentType={"password"}
                                    secureTextEntry={true}
                                    onChangeText={password => {
                                        setForm({username:form.username, password:password, isSubmited:false});
                                        // setIsSubmited(false);
                                    }} 
                                    errorStyle={{marginLeft:5,color:Colors.red500, fontSize:13}}
                                    errorText={form.password == "" && form.isSubmited ? "Password cant be empty" : ""}
                                />
                                <Column align="flex-end" style={{paddingVertical:10}}>
                                    <Link style={{color:MAIN_CONTRAST}} to="/profile/jane">Forgot Password ?</Link>
                                </Column>

                                <ButtonBlock fontColor={MAIN} fontWeight={"700"} height={50} fontSize={20} rippleColor="rgba(118,188, 188)" onPress={doLogin} color={MAIN_SECOND} uppercase={false} style={{backgroundColor:MAIN_FOURTH , borderRadius:30}}>
                                    Sign In
                                </ButtonBlock>
                                <Column align="center" style={{paddingTop:20}}>
                                    <Texts>Or Sign In With</Texts>
                                </Column>
                                <Row style={{ height:60,paddingHorizontal:10,justifyContent:"center",backgroundColor:WHITE, marginTop:10}}> 
                                    <ButtonIconCircle icon="google-"
                                        
                                        style={{marginHorizontal:10}}
                                        width={48}
                                        color={MAIN}
                                        size={20}
                                        rippleColor={MAIN_SECOND}
                                        onPress={() => console.log('Pressed')} >
                                    </ButtonIconCircle>
                                    <ButtonIconCircle icon="facebook"
                                        style={{marginHorizontal:10}}
                                        width={48}
                                        color={MAIN}
                                        size={20}
                                        rippleColor={MAIN_SECOND}
                                        onPress={() => console.log('Pressed')} >
                                        
                                    </ButtonIconCircle>
                                    <ButtonIconCircle icon="twitter"
                                        style={{marginHorizontal:10}}
                                        width={48}
                                        color={MAIN}
                                        size={20}
                                        rippleColor={MAIN_SECOND}
                                        onPress={() => console.log('Pressed')} >
                                        
                                    </ButtonIconCircle>
                                </Row>
                            </ContainerBox>
                            
                            {/* <Column align="center" style={{paddingHorizontal:10,justifyContent:"center",backgroundColor:"white", flex:1}}> 
                                <ButtonBlock fontSize={18} rippleColor="rgba(118,188, 188)" onPress={() => console.log("")} color={MAIN_SECOND} uppercase={false} style={{backgroundColor:MAIN_FOURTH , borderRadius:30}}>Sign In</ButtonBlock>
                            </Column> */}
                        </ImageBackground>
                    </Column>
            </Foundation>
            <Toast visible={auth.message != "" && auth.message != null && auth.message != undefined} message={auth.message} />
            {/* <Snackbar
                visible={() => {
                    if(aauth.message.lentgh > 0){
                        return true;
                    }
                    return false;
                }}
                duration={Snackbar.DURATION_MEDIUM}
                onDismiss={() => console.log("dismis")}
                style={{backgroundColor:MAIN_SECOND, elevation:1}}
                >
                {auth.message}
            </Snackbar> */}
    </Aux>
});

const mapStateToProps = (state) => {
    const { auth } = state;
    // console.log(auth);
    return {
        auth:auth,
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    dispatch
}, dispatch)

export default connect(
    mapStateToProps,
mapDispatchToProps
)(LoginScreen);
