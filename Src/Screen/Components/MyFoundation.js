import React, { memo } from 'react'
import Foundation from '../../Components/Foundation'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const MyFoundation = memo(({dispatch, auth, screen, ...props}) => {

    return <Foundation {...props} isLoading={screen.isLoading}>
        {props.children}
    </Foundation>;
}, (prevProps, nextProps)=> {
    // return true;
    // console.log(prevProps.screen.isLoading);
    // console.log(nextProps.screen.isLoading);
    // console.log(prevProps.isLoading)
    // console.log(nextProps.isLoading)
    return prevProps.screen.isLoading != nextProps.screen.isLoading;
});


const mapStateToProps = (state) => {
    const { auth, screen } = state;
    // console.log(screen.isLoading);
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
)(MyFoundation);