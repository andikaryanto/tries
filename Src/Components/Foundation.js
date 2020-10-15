import React, { memo } from 'react'
import ContainerBox from './Container/ContainerBox';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native'
import Center from './Center';
import { MAIN, WHITE } from '../Const/Colors';
import Spinner from 'react-native-spinkit';
import Column from './Column';
import Texts from './Text';
import Icon from 'react-native-vector-icons/Entypo';
const Foundation  = memo(({ header, footer, style, scrollable ,isKeyboardShown, isLoading, ...props }) => {

    let headerComponent = null;
    if(header != undefined){ 
        headerComponent = header
    }

    let footerComponent = null;
    if(footer != undefined){ 
        footerComponent = React.cloneElement(footer, {style : {...footer.props.style, backgroundColor:footer.props.backgroundColor ? footer.props.backgroundColor : style.backgroundColor}});
    }

    let canScroll = scrollable;

    // if(isKeyboardShown)
    //     canScroll = true;

    canScroll = isLoading ? false : canScroll;
    if(canScroll){
        return <>
        
        {headerComponent}
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}} alwaysBounceVertical={false} bounces={false} nestedScrollEnabled = {true}>
            {/* <Text>asdadasd</Text> */}
            <View {...props} style={{...style, flex:1, }}>
                {props.children}
            </View>
            {isKeyboardShown ? footerComponent : null}
        </ScrollView>
        {!isKeyboardShown ? footerComponent : null}
        
    </>
    } 
    
    return <>
        <ContainerBox {...props} style={{...style, flex:1}}>
            {headerComponent}
            {props.children}
            
        </ContainerBox>
        {footerComponent}
        {/* {isLoading ? null : footerComponent}
        {isLoading ? 
        <View style={{ zIndex:1, width:"100%",height:"100%", position:"absolute", backgroundColor:"rgba(0,0,0, 0.3)"}}>
            <Center>
                <Column style={{height:100, width:100, backgroundColor:WHITE, borderRadius:15}}>
                    <Center>
                        <Texts style={{fontSize:15, color:MAIN}}>Loading</Texts>
                        <Spinner isVisible={true} size={30} type={"ThreeBounce"} color={MAIN}/>
                    </Center>
                </Column>
            </Center>
        </View> : null} */}
    </>
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
)(Foundation);

