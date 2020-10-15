import React, { memo, useEffect } from 'react'
import Center from '../Components/Center'
import { View, StyleSheet, ImageBackground, Dimensions} from 'react-native'
import { LIGHT, MAIN_FOURTH } from '../Const/Colors'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getToken } from '../Storage/Users'
import { setLoggedIn } from '../Selectors/Auth';
import { loggedIn } from '../Actions/Auth';
const SplashScreen = memo(({ navigation, dispatch, auth, ...props }) => {

    

    useEffect(() => {
        dispatch(setLoggedIn((isLoggedIn) => {
            if(isLoggedIn){
                dispatch(loggedIn(true));
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ProjectsScreen' }],
                });
            } else {
                dispatch(loggedIn(false));
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                });
            }
        }))        
    }, [])

    const styles = StyleSheet.create({
       
        logo: {
            width: 250,
            height: 250,
            resizeMode:'stretch',
        },
    });

    return <>
        {/* <Stack> */}
            <View key="background" style={{position:"absolute", height:"100%", width:"100%", backgroundColor:MAIN_FOURTH}}></View>
            
        {/* </Stack> */}
        <Center key="image">
            <ImageBackground 
                    style={styles.logo}
                    imageStyle={{ borderRadius: 1250, borderColor:LIGHT, borderWidth: 2, }}
                    source={require('../Assets/Img/logo.png')}
                    
                />
        </Center>
    </>

});

const mapStateToProps = (state) => {
    const { auth } = state;
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
)(SplashScreen);
