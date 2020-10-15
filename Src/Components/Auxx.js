import React, { memo, useState, useEffect } from 'react'
import { Keyboard, InteractionManager, View } from 'react-native';
import { showKeyboard, hideKeyboard } from '../Actions/Mobile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-native-gesture-handler';
import Text from './Text';
const Aux = memo(({ navigation, ...props }) =>  {   

    const [isFocused, setFocused] = useState(false);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        // InteractionManager.runAfterInteractions(() => {
            
        //     setFocused(true);
        // })
        // const focusListener = navigation.addListener('focus', () => {
        //   // The screen is focused
        //   // Call any action
        //   setFocused(true);
        //   console.log("focus")
        // });

        // const transStartListener = navigation.addListener('transitionStart ', () => {
        //     // The screen is focused
        //     // Call any action
        //     // setFocused(true);
        //     console.log("start")
        //   });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => {
            Keyboard.removeListener("keyboardDidShow",_keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide",_keyboardDidHide);
            // focusListener;
            // transStartListener;
        } 
    }, []);
    
    const _keyboardDidShow = () => {
        const {dispatch} = props;
        dispatch(showKeyboard())
        
    }

    const _keyboardDidHide = () => {
        const {dispatch} = props;
        dispatch(hideKeyboard())
    };
    return <View style={{flexDirection:"column",flex:1}}>{props.children}</View>;
    // return <>{isFocused ? <Text>aaaa</Text> : null}</>
    return <>{isFocused ? props.children : null}</>
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
        dispatch
}, dispatch)

export default connect(
null,
mapDispatchToProps
)(Aux);