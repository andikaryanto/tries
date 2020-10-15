import React, { useEffect, useState, memo } from 'react'
import { View, Keyboard } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const Footer = memo(({ style, backgroundColor, isKeyboardShown, elevation, ...props }) => {
    
        
        
    let styles = {
        ...style,
        elevation:elevation != undefined ? (isKeyboardShown ? 0 : elevation) : 0,
        // elevation:elevation,
        backgroundColor:backgroundColor,
        width:"100%",
    }
    return <View {...props} style={styles}>
        {props.children}
    </View>
    return  !isKeyboardShown ? <View {...props} style={styles}>
        {props.children}
    </View>  : null;
})

const mapStateToProps = state => {
    
    const { mobile } = state;
    return {
        // isLoaded : !pagestatus.isLoading,
        isKeyboardShown: mobile.isKeyboardShown,
    }
}
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
        dispatch
}, dispatch)

export default connect(
mapStateToProps,
mapDispatchToProps
)(Footer);