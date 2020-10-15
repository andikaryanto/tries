import React, { memo, useEffect, useState } from 'react';
import { RefreshControl, StatusBar, StyleSheet } from 'react-native';
import Aux from '../../Components/Auxx';
import Column from '../../Components/Column';
import ContainerBox from '../../Components/Container/ContainerBox';
import Foundation from '../../Components/Foundation';
import Row from '../../Components/Row';
import Texts from '../../Components/Text';
import { FONT, LIGHT, MAIN, MAIN_CONTRAST, MAIN_FOURTH, MAIN_SECOND, MAIN_THIRD, WHITE } from '../../Const/Colors';
import { connect } from 'react-redux';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import ListDataLazy from '../../Components/List/ListDataLazy';
import { getDataList } from '../../Selectors/Screen';
import { GET_SPRINTS } from '../../Const/Api';
import CardRectangle from '../../Components/Card/CardRectangle';
import { setSprints } from '../../Actions/Module/Sprints';
import { screenLoading } from '../../Actions/Screen';


const SprintScreen = memo(({navigation, screen, sprint, route, dispatch, ...props}) => {

    const { projectName, projectId } = route.params;

    let controller = new AbortController();


    const createSprint = () => {
        navigation.navigate("CreateSprintScreen", {projectName:projectName, projectId:projectId})
    }

    const loadData = () => {
        const { screenLoading, setSprints } = props;
        screenLoading(true);
        getDataList(GET_SPRINTS+projectId, controller)
        .then(result => {
            screenLoading(false);
            setSprints(result);
        })
        .catch(err => {
            screenLoading(false);
        })
    }

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            loadData();
        });
        // loadData();
        return () => {
            // focusListener.remove();
            controller.abort();
        }
    }, []);

    useEffect(() => {
        loadData();
        return () => {
            controller.abort();
        }
    }, []);


    const onRefresh = () => {
        loadData()
    }

    const renderSprint = ({item, index}) => {
        let i = index;
        return <Column key ={item.Id+i} style={{paddingHorizontal:10, backgroundColor:WHITE, }}>
            <CardRectangle  rippleColor={MAIN_FOURTH} style={{ width:"100%", backgroundColor:WHITE, borderBottomWidth:0.5, borderColor:MAIN_FOURTH}} onPress = {() => console.log("")}>
                    
                <Row style={{justifyContent:"space-between", alignItems:"center", zIndex:1}}>
                    <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:item.IsActive == "1" ? MAIN_CONTRAST : MAIN,fontSize:20, fontWeight:"500"}}>{item.Name}</Texts>
                   
                </Row>
                <Row style={{justifyContent:"space-between", alignItems:"center", zIndex:1}}>
                    <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:MAIN_THIRD,fontSize:13, marginBottom:5}}>{item.Description}</Texts>
                </Row>
                
               
            </CardRectangle>
        </Column>
    }

    return <Aux>
            <Foundation style={{backgroundColor:LIGHT}} scrollable = {false}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
                <ContainerBox style={{marginTop:40, flex:1}}>
                    <Column  style={{ paddingHorizontal:20}}> 
                       
                        <Row >
                        <Texts numberOfLines={2} ellipsizeMode='tail' style={styleAll.nameText}>{projectName}</Texts>
                            
                        </Row>
                        <Texts style={styleAll.welcomeText}>Created sprints for this project.</Texts>
                        
                        <Row style = {{ zIndex:1, marginBottom:-24, justifyContent: 'flex-end'}}>
                            {/* <ButtonIconCircle  rippleColor={WHITE} style={{backgroundColor:MAIN, elevation:0,  }} color={WHITE} size ={20} icon={"plus"} onPress={() => dispatch(screenLoading())}></ButtonIconCircle> */}
                            
                            <ButtonIconCircle  rippleColor={WHITE} style={{backgroundColor:MAIN, elevation:0,  }} color={WHITE} size ={20} icon={"plus"} onPress={createSprint}></ButtonIconCircle>
                        </Row>
                    </Column>
                    <Column style={{justifyContent:"center", flex:1, backgroundColor:WHITE}}>
        
                        <ListDataLazy 
                            style={{paddingBottom:50}}
                            refreshControl={<RefreshControl refreshing={screen.loading} onRefresh={onRefresh} />} 
                            alwaysBounceVertical={true} 
                            showsVerticalScrollIndicator={false} 
                            style={{flex:1}} 
                            contentContainerStyle={{flexGrow: 1}} 
                            renderItem={renderSprint} 
                            data = {sprint.list} 
                            keyExtractor={item => item.Id}
                            // onScroll={handleScroll}
                        />
                    </Column>
                </ContainerBox>
            </Foundation>
        </Aux>


});

const styleAll = StyleSheet.create({
    welcomeText:{
        fontSize:17,
        color:MAIN_SECOND,
    },    
    nameText: {
        fontSize: 25,
        fontWeight: "500",
        flex: 4, 
        flexWrap: 'wrap',
        color:FONT,
    },
});

const mapStateToProps = (state) => {
    const { sprint, screen } = state;
    return {
        screen:screen,
        sprint:sprint
    }
}

const mapDispatchToProps = { setSprints, screenLoading }

export default connect(
    mapStateToProps,
mapDispatchToProps
)(SprintScreen);