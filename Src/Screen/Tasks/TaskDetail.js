import React, { memo, useEffect, useRef, useState } from 'react'
import Aux from '../../Components/Auxx';
import Foundation from '../../Components/Foundation';
import { RefreshControl, StatusBar, Animated, Easing, Dimensions, Image } from 'react-native';
import ContainerBox from '../../Components/Container/ContainerBox';
import Texts from '../../Components/Text';
import { LIGHT, MAIN, GREY, MAIN_FOURTH, WHITE, MAIN_SECOND, MAIN_CONTRAST } from '../../Const/Colors';
import Row from '../../Components/Row';
import ButtonIconCircle from '../../Components/Button/ButtonIconCircle';
import CardRounded from '../../Components/Card/CardRounded';
import Column from '../../Components/Column';
import Avatar from '../../Components/Avatar/Avatar';
import ListDataLazy from '../../Components/List/ListDataLazy';
import { getData, postData, postMultipart } from '../../Selectors/Screen';
import { CREATE_COMMENT,BASE_URL, GET_TASK } from '../../Const/Api';
import Snackbar from 'react-native-snackbar';
import { getPhoto, getUsername } from '../../Storage/Users';
import Spinner from 'react-native-spinkit';
import { RandomString } from '../../Helper/General';
import StandartInput from '../../Components/Input/StandartInput';
import { ScrollView } from 'react-native-gesture-handler';
import DocumentFile from '../../Helper/DocumentFile';
const TaskDetailScreen = memo(({navigation, route}) => {

    const { taskId, taskName, taskDesciption } = route.params;
    const [reply, setReply] = useState("");
    const [task, setTask] = useState(null);
    const [comments, setComment] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showAttachment, setShowAttachment] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [animationValue, setAnimationValue] = useState(new Animated.Value(0))
    
    let dimension = Dimensions.get("screen");
    
    

    let controller = new AbortController();

    const loadData = () => {
        setRefreshing(true);
        getData(GET_TASK+taskId, controller)
        .then(result => {
            // console.log(result);
            setTask(result);
            setComment(result.Comments);
            setRefreshing(false);

        })
        .catch(err => {

            setRefreshing(false);
        })
    }

    useEffect(() => {
        loadData();
        return () => {
            controller.abort();
        }
    },[]);

    const comment = async () => {
        if(reply == ""){
            return;
        }
        let user = await getUsername();
        let urlPhoto = await getPhoto();
        let body = {
            Id:"",
            SurogateId:RandomString(10),
            M_User_Id:null,
            CommentedBy:user,
            T_Taskdetail_Id:taskId,
            Comment:reply,
            Photo:urlPhoto,
            Attachments:[],
            Status:"posting"
        };

        let newComments = [];
        comments.forEach((e, i) => {
            newComments.push(e);
        });

        newComments.push(body)
        setComment(newComments);

        postMultipart(CREATE_COMMENT, controller, body, attachments)
        .then(result => {
            Snackbar.show({
                text:"Your comment has been posted",
                duration:Snackbar.LENGTH_SHORT
            });
            setAttachments([]);
            setReply("");
            loadData();
        })
        .catch(err => {
            Snackbar.show({
                text:err.message,
                duration:Snackbar.LENGTH_SHORT
            });

            loadData();
        })


    }

    const setForm  = (field, value) => {
        setReply(value);
    }

    const attachmentAdd = (file) => {

        let newAttachment = [];
        attachments.forEach((e, i) => {
            newAttachment.push(e);
        })

        newAttachment.push(file);
        setAttachments(newAttachment);
    }

    const onRefresh = () => {
        loadData();
    }
    const openDocument = async (type) => {
            let file = await DocumentFile.openDocument(type);
            attachmentAdd(file);
          
    }

    const removeAttachment = (i) => {
        attachments.splice(i,1);

        let newAttachment = [];
        attachments.forEach((e, i) => {
            newAttachment.push(e);
        })

        setAttachments(newAttachment);
    }

    
    const toggleAttch = () => {
        if(!showAttachment){

            Animated.timing(
                animationValue,
                {
                    toValue:1,
                    duration:200,
                    useNativeDriver:false
                }
            ).start();
        } else {
            Animated.timing(
                animationValue,
                {
                    toValue:0,
                    duration:200,
                    useNativeDriver:false
                }
            ).start();
        }
        setShowAttachment(!showAttachment);
    }

    const renderComment = ({item, index}) => {
        return <Row key={RandomString(10)}  style={{marginVertical:5, paddingHorizontal:20}}>
            <Avatar source={{uri:BASE_URL+item.Photo}}></Avatar>
            <CardRounded style={{marginLeft:10, width:"80%"}} padding={10}>
                <Row style={{alignItems:"center"}}>
                    <Texts style={{color:MAIN, marginRight:10, fontSize:16}}>{item.CommentedBy}</Texts>
                    {item.Status == "posting" ? <Spinner isVisible={true} size={20} type={"ThreeBounce"} color={MAIN}/> : null}
                </Row>
                <Texts style={{fontSize:15,color:GREY,marginRight:10, marginBottom:5}}>{item.Comment}</Texts>
                {item.Attachments.length > 0 ? <Column style={{marginLeft:10, padding:5, borderRadius:5}}>
                    {
                        item.Attachments.map((e, i) => {
                            if(e.Type == "jpg" || e.Type=="png"){
                                return <Image style={{width:"100%", height:50, marginBottom:5, borderRadius:5}} source={{uri:BASE_URL+"/"+e.UrlFile}}> 

                                </Image>;
                            }
                            return <Texts key={RandomString(10)} numberOfLines={1} ellipsizeMode='tail'  style={{fontSize:15,color:MAIN_CONTRAST ,marginRight:10, marginBottom:5, textDecorationLine:"underline"}}>{e.FileName}</Texts>
                        })
                    }
                </Column> : null}
            </CardRounded>
        </Row> 
    }

    return <Aux>
        <Foundation style={{backgroundColor:LIGHT}} scrollable = {false} >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.3)" barStyle="light-content" hidden={false} translucent={true}/>
           
            <ContainerBox style={{flex:1, backgroundColor:MAIN_FOURTH}}>
                <Column style={{paddingHorizontal:20,  marginTop:40}}>
                    <Row style={{alignItems:"center", justifyContent:"space-between"}}>
                        <Texts style={{color:MAIN, fontSize:30, fontWeight:"500"}}>{taskName}</Texts>
                        {/* <ButtonIconCircle rippleColor={MAIN}  icon={"attachment"} size={20} color={MAIN} onPress={() => console.log("aa")}></ButtonIconCircle> */}
                    </Row>
                   
                    <Texts style={{fontSize:17,color:MAIN,marginRight:10, marginBottom:10}}>{taskDesciption}</Texts>
                </Column>
                <Column style={{flex:1, backgroundColor:MAIN_FOURTH, height:"100%", paddingBottom:0}}> 
                
                    <ListDataLazy 
                        
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
                        alwaysBounceVertical={true} 
                        showsVerticalScrollIndicator={false} 
                        style={{flex:1, }} 
                        contentContainerStyle={{flexGrow: 1}} 
                        renderItem={renderComment} 
                        data = {comments} 
                        keyExtractor={item => item.SurogateId}
                    />
                </Column>
                
            </ContainerBox>
        </Foundation>
        <Column style={{paddingHorizontal:10, backgroundColor:MAIN_FOURTH}}>

            <Animated.View style={{marginTop:5, overflow:"hidden",width:"100%", 
                paddingHorizontal:animationValue.interpolate(
                    {
                        inputRange:[0,1],
                        outputRange:[0,5]
                    }
                ), paddingVertical:animationValue.interpolate(
                    {
                        inputRange:[0,1],
                        outputRange:[0,15]
                    }
                ), height:animationValue.interpolate(
                    {
                        inputRange:[0,1],
                        outputRange:[0,100]
                    }
                ),
                backgroundColor:WHITE, borderRadius:20, 
                marginBottom:animationValue.interpolate(
                    {
                        inputRange:[0,1],
                        outputRange:[0,5]
                    }
                ),}}>
                {/* <Row reverse={true}> 
                    <ButtonIconCircle width = {24} onPress={() => {setShowAttachment(false)}} rippleColor={MAIN_FOURTH} icon={"cross"} size={20} color={GREY}></ButtonIconCircle>
                </Row> */}
                <Row style={{justifyContent:"space-around", paddingHorizontal:10}}>
                    <Column style={{alignItems:"center", marginHorizontal:10}}>
                        <ButtonIconCircle style={{backgroundColor:"rgba(0,0,0, 0.1)"}} width = {48} onPress={() => {openDocument(DocumentFile.AllFiles)}} rippleColor={MAIN_FOURTH} icon={"text-document"} size={20} color={MAIN}></ButtonIconCircle>
                        <Texts style={{fontSize:13,color:MAIN}}>Document</Texts>
                    </Column>
                    {/* <Column style={{alignItems:"center", marginHorizontal:10}}>
                        <ButtonIconCircle style={{backgroundColor:"rgba(0,0,0, 0.1)"}} width = {48} onPress={() => {openDocument(DocumentFile.Camera)}} rippleColor={MAIN_FOURTH} icon={"camera"} size={20} color={MAIN}></ButtonIconCircle>
                        <Texts style={{fontSize:13,color:MAIN, marginBottom:10}}>Camera</Texts>
                    </Column> */}

                    <Column style={{alignItems:"center", marginHorizontal:10}}>
                        <ButtonIconCircle style={{backgroundColor:"rgba(0,0,0, 0.1)"}} width = {48} onPress={() => {openDocument(DocumentFile.Galery)}} rippleColor={MAIN_FOURTH} icon={"image"} size={20} color={MAIN}></ButtonIconCircle>
                        <Texts style={{fontSize:13,color:MAIN}}>Galery</Texts>
                    </Column>
                </Row>
            </Animated.View>
            {attachments.length > 0 ? <Column  style={{justifyContent:"center", paddingHorizontal:15, paddingTop:5, paddingBottom:5, backgroundColor:WHITE, borderRadius:20, marginBottom:5}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  > 
                    {
                        attachments.map((e, i) => {
                            return <Row key={RandomString(10)} style={{height:25,  alignItems:"center", borderRadius:12, paddingLeft:10}}>
                                <Texts>{e.name}</Texts>
                                <ButtonIconCircle width = {24} onPress={() => {removeAttachment(i)}} rippleColor={MAIN_FOURTH} icon={"cross"} size={20} color={GREY}></ButtonIconCircle>
                            </Row>
                        })
                    }
                </ScrollView>
                
            </Column> : null}
        </Column>
        <Row style={{ paddingHorizontal:10, justifyContent:"center", alignItems:"center", backgroundColor:MAIN_FOURTH, paddingVertical:5}}>
            <StandartInput
                append={<ButtonIconCircle width = {48} onPress={() => {toggleAttch()}} rippleColor={MAIN_FOURTH} icon={"attachment"} size={20} color={MAIN}></ButtonIconCircle>}
                multiline={true}
                field ={"Reply"}
                placeholder={"Enter Reply"}
                placeholderTextColor={MAIN}
                width={"80%"}
                value={reply}
                style={{ marginRight:10, color:MAIN,paddingLeft:10, height: 48, backgroundColor:"rgba(0,0,0, 0.1)", borderRadius:24}}
                onValueChange={setForm}
            />
            <ButtonIconCircle width = {48} onPress={comment} rippleColor={MAIN} icon={"rocket"} size={20} color={MAIN}></ButtonIconCircle>
        </Row>
        
    </Aux>
})

export default TaskDetailScreen;