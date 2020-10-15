import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LIGHT, MAIN, MAIN_FOURTH, WHITE, MAIN_SECOND, GREY, MAIN_CONTRAST, BLACK } from '../../Const/Colors';
import { ImageBackground, StyleSheet, Dimensions,  StatusBar, ToastAndroid} from 'react-native';
import ContainerBox from '../../Components/Container/ContainerBox';
import Texts from '../../Components/Text';
import Column from '../../Components/Column';
import Row from '../../Components/Row';
import Box from '../../Components/Box';
import Foundation from '../../Components/Foundation';
import { TextInput,  Colors } from 'react-native-paper';
import Aux from '../../Components/Auxx';
import Footer from '../../Components/Footer/Footer';
import ButtonBlock from '../../Components/Button/ButtonBlock';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import { Link, StackActions } from '@react-navigation/native';
import { Authenticate, Register } from '../../Selectors/Auth';
import Toast from '../../Components/Toast';
import FloatingInput from '../../Components/Input/FloatingInput';
import { useSafeArea } from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';
import { hideScreenLoader, showScreenLoader } from '../../Components/Loader/ScreenLoader';
// import Snackbar from 'react-native-snackbar';
const RegisterScreen = memo(({navigation, auth, ...props}) => {
    const win = Dimensions.get("screen");
   

   

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

    const [form, setForm] = useState({email: "",name:"", username:"", password:"", isSubmited:false})


    const doRegister = () => {
        setForm({...form, isSubmited:true});
        if(form.email != "" && form.name != "" && form.username != "" && form.password != ""){

            showScreenLoader("Registering");
            Register({email:form.email, name:form.name, username:form.username, password:form.password})
            .then(result => {
                hideScreenLoader();
                Snackbar.show({
                    text:result.message,
                    duration:Snackbar.LENGTH_SHORT
                })
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                });
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
    

    let footer = <Footer backgroundColor={WHITE} style={{padding:10}} elevation={10}>
                
                <Column align="center" style={{paddingTop:5, paddingBottom:15}}>
                    <Texts>Have An Account ? <Link style={{color:MAIN_CONTRAST}} action={StackActions.replace('LoginScreen')}>Sign In</Link></Texts>
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
                                <Texts style={{color:MAIN_SECOND, fontSize:30}}>Register Account</Texts>
                                <FloatingInput underlineColor={GREY} style = {{backgroundColor:"transparent"}}
                                    key={"email"}
                                    label={"Email"}
                                    textContentType={"emailAddress"}
                                    // value={form.email}
                                    onChangeText={email => {
                                        setForm({...form,  email:email, isSubmited:false});
                                    }}
                                    errorStyle={{marginLeft:5, color:Colors.red500, fontSize:13}}
                                    errorText={form.email == "" && form.isSubmited ? "Email cant be empty" : ""}
                                />
                                <FloatingInput underlineColor={GREY} style = {{backgroundColor:"transparent"}}
                                    key={"name"}
                                    label={"Display Name"}
                                    textContentType={"name"}
                                    // value={form.username}
                                    onChangeText={name => {
                                        setForm({ ...form, name:name, isSubmited:false});
                                    }}
                                    errorStyle={{marginLeft:5, color:Colors.red500, fontSize:13}}
                                    errorText={form.name == "" && form.isSubmited ? "Name cant be empty" : ""}
                                />
                                <FloatingInput underlineColor={GREY} style = {{backgroundColor:"transparent"}}
                                    key={"username"}
                                    label={"Username"}
                                    textContentType={"username"}
                                    // value={form.username}
                                    onChangeText={username => {
                                        setForm({ ...form, username:username, isSubmited:false});
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
                                        setForm({...form, password:password, isSubmited:false});
                                        // setIsSubmited(false);
                                    }} 
                                    errorStyle={{marginLeft:5,color:Colors.red500, fontSize:13}}
                                    errorText={form.password == "" && form.isSubmited ? "Password cant be empty" : ""}
                                />

                                <ButtonBlock fontColor={MAIN} fontWeight={"700"} height={50} fontSize={20} rippleColor="rgba(118,188, 188)" onPress={doRegister} color={MAIN_SECOND} uppercase={false} style={{marginTop:20,backgroundColor:MAIN_FOURTH , borderRadius:30}}>
                                    Register
                                </ButtonBlock>
                            </ContainerBox>
                            
                            {/* <Column align="center" style={{paddingHorizontal:10,justifyContent:"center",backgroundColor:"white", flex:1}}> 
                                <ButtonBlock fontSize={18} rippleColor="rgba(118,188, 188)" onPress={() => console.log("")} color={MAIN_SECOND} uppercase={false} style={{backgroundColor:MAIN_FOURTH , borderRadius:30}}>Sign In</ButtonBlock>
                            </Column> */}
                        </ImageBackground>
                    </Column>
            </Foundation>
            <Toast visible={auth.message} message={auth.message} />
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
    null
)(RegisterScreen);
