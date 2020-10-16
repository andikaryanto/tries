import React, { memo, useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView } from 'react-native';
import { Colors } from 'react-native-paper';
import Animated, { Easing } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { setMineTask } from '../../../Actions/Module/Tasks';
import { screenLoading } from '../../../Actions/Screen';
import ButtonBlock from '../../../Components/Button/ButtonBlock';
import ButtonIconCircle from '../../../Components/Button/ButtonIconCircle';
import ButtonStandart from '../../../Components/Button/ButtonStandart';
import CardRectangle from '../../../Components/Card/CardRectangle';
import Center from '../../../Components/Center';
import Checkbox from '../../../Components/Checkbox/Checkbox';
import Column from '../../../Components/Column';
import ListDataLazy from '../../../Components/List/ListDataLazy';
import { hideScreenLoader, showScreenLoader } from '../../../Components/Loader/ScreenLoader';
import Row from '../../../Components/Row';
import Texts from '../../../Components/Text';
import { GET_MYTASK, MOVE_TASK } from '../../../Const/Api';
import { MAIN_CONTRAST, MAIN_FOURTH, WARNING, WHITE, MAIN, FONT, GREY, MAIN_SECOND, MAIN_THIRD, DARK, DARK_SECOND } from '../../../Const/Colors';
import { RandomString } from '../../../Helper/General';
import { getData, getDataList, postData } from '../../../Selectors/Screen';
const Doing = memo(({navigation, route, doings, screen, ...props}) => {

    const { projectId, projectName } = route.params;
     
    let controller = new AbortController();
    const win = Dimensions.get("screen");

    const [selectedItem, setSelectedItem] = useState([]);

    const loadData = () => {
        const { setMineTask } = props;
        screenLoading(true);
        getDataList(GET_MYTASK+projectId, controller)
        .then(result => {
            setMineTask(result);
            screenLoading(false);
        })
        .catch(err => {
            screenLoading(false);
        })
    }

    useEffect(() => {
        // loadData();
        
        return () => {
            controller.abort();
        }
    }, []);

    const moveTo = (type) => {
        showScreenLoader("Updating");
        let body = {
            TasksIds:tasks()
        }

        postData(MOVE_TASK+type, controller, body)
        .then(result => {
            setSelectedItem([]);
            hideScreenLoader();
            loadData();
        })
        .catch(err => {
            hideScreenLoader();
        })

    }

    const tasks = () => {
        return selectedItem.map((e, i) => {
            return e.Id;
        })
    }

    const onRefresh = () => {
        loadData();
    }

    

    const onLongPressItem = (item, checked) => {

        // Animated.timing(animVal, 
        //     {
        //         toValue:100,
        //         duration:2000,
        //         easing:Easing.bounce,
        //         useNativeDriver:false
        //     }
        // ).start();

        let found = selectedItem.findIndex(x => x.Id == item.Id);
        if(!checked && found > -1){
            selectedItem.splice(found, 1);
        }

        let newdata = [];
        if(checked && found == -1){
            selectedItem.push(item);
        }

        selectedItem.forEach((e, i) => {
            newdata.push(e);
        })
        setSelectedItem(newdata);
    }

    const onPressItem = (item, checked) => {
        if(selectedItem.length == 0){
            navigation.navigate("TaskDetailScreen", {taskId:item.Id, taskName:item.Name, taskDesciption:item.Description});
        } else {
        
            onLongPressItem(item, checked);
        }
    }

   


    const renderList = ({item, index}) => {
        let task = item;
        let i = index;
        let found = selectedItem.findIndex(x => x.Id == task.Id);
        return <Column key ={RandomString(10)} style={{backgroundColor:WHITE, }}>
            <CardRectangle rippleColor={MAIN_FOURTH} style={{ width:"100%", backgroundColor:screen.darkmode ? DARK : WHITE, borderBottomWidth:0.5, borderColor:screen.darkmode ? DARK_SECOND : MAIN_FOURTH}} 
                    onPress = {() => { onPressItem(task, !(found > -1)) }}
                    onLongPress={() =>{ onLongPressItem(task, true) } }
                    >
                        
                    <Row style={{alignItems:"center"}}>
                    {selectedItem.length > 0 ? <Checkbox
                        isChecked={found > -1}
                        checkedColor={MAIN_CONTRAST}
                        value={false}
                        item={task}
                        onValueChange={onLongPressItem}
                        style={{marginRight:10}}
                    /> : null}
                    <Column key ={RandomString(10)}>
                            <Row key={RandomString(10)} style={{justifyContent:"space-between", alignItems:"center", zIndex:1}}>
                                <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:screen.darkmode ? MAIN_THIRD : MAIN,fontSize:20, fontWeight:"500"}}>{task.Name}</Texts>
                            
                            </Row>
                            <Row key={RandomString(10)} style={{justifyContent:"space-between", alignItems:"center", zIndex:1}}>
                                <Texts numberOfLines={1} ellipsizeMode='tail' style={{color:screen.darkmode ? WHITE : MAIN_THIRD,fontSize:13, marginBottom:5}}>{task.Created}</Texts>
                            </Row>
                            <Row key={RandomString(10)} style={{width:"95%", alignItems:"center"}}><Texts numberOfLines={3} ellipsizeMode='tail' style={{color:GREY, fontSize:16}}>{task.Description} </Texts>
                            </Row>
                            <Row key={RandomString(10)} style={{marginTop:10, marginRight:10}}>
                                                
                                <Icon key={RandomString(10)} color={GREY} size={15} name="message" />
                                <Texts numberOfLines={3} ellipsizeMode='tail' style={{color:GREY, fontSize:13, marginLeft:5}}>{task.Comments} </Texts>
                            </Row>
                                
                        </Column> 
                    </Row>
                    
        
                </CardRectangle>
            </Column>
    }

    return <>
        <Column style={{ justifyContent:"center",paddingTop:10,paddingHorizontal:10, flex:1, backgroundColor:screen.darkmode ? DARK : WHITE}}>
            <ListDataLazy 
                        style={{paddingBottom:50}}
                        refreshControl={<RefreshControl refreshing={screen.refreshing} onRefresh={onRefresh} />} 
                        alwaysBounceVertical={true} 
                        showsVerticalScrollIndicator={false} 
                        style={{flex:1}} 
                        contentContainerStyle={{flexGrow: 1}} 
                        renderItem={renderList} 
                        data = {doings} 
                        keyExtractor={item => item.Id}
                        // onScroll={handleScroll}
                    />
           
            {selectedItem.length > 0 ? <Column style={{ alignItems:"center", position:"absolute", margin:"auto", right: 20, bottom: 20,borderRadius:25 }}>
            
                <ButtonIconCircle icon="clipboard" size={24} color={MAIN} style={{elevation:5, backgroundColor:WHITE, marginBottom:10}} onPress={() => { moveTo(2)} } />
                <ButtonIconCircle icon="cog" size={24} color={MAIN} style={{elevation:5, backgroundColor:WHITE}} onPress={() => { moveTo(3)} } />
                
            </Column> : null}
        </Column>

    </>
});

const mapStateToProps = state => {
    const { task, screen } = state;
    return {
        screen:screen,
        doings:task.mine.doings || []
    }
}


const mapDispatchToProps = { setMineTask, screenLoading }

export default connect(
    mapStateToProps,
mapDispatchToProps
)(Doing);