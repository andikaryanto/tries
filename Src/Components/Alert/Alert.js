import React, { memo, useState, forwardRef, useEffect, useImperativeHandle } from 'react';
import { Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import Column from '../Column';
import Center from '../Center';
import { WHITE, MAIN_CONTRAST, MAIN, GREY } from '../../Const/Colors';
import Row from '../Row';
import Texts from '../Text';

const Alert = forwardRef(({visible, style, onCancel, onConfirm, ...props}, ref) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("");

    // useEffect(() => {
    //     setModalVisible(visible);
    // }, [])
    // function hide(){
    //     setModalVisible(false);
    // }

    useImperativeHandle(ref, () => ({

        show(){
            setModalVisible(true);
            setTimeout(() => {
                setBackgroundColor("rgba(0,0,0,0.3)")
            }, 300)
            // setBackgroundColor("rgba(0,0,0,0.3)")
        },

        hide(){
            setModalVisible(false);
        }
    
    }));

    return <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
            setBackgroundColor("");
            setModalVisible(false);
        }}

        // onShow={() => setBackgroundColor("rgba(0,0,0,0.3)")}
    >
        <Center  style={{width:"100%", height:"100%"}}>
            <Column  style={{width:"70%", backgroundColor:WHITE, elevation:5, paddingHorizontal:15,paddingVertical:20, borderRadius:10}}>
                {props.children}

                <Row reverse={true} style={{marginTop:25}}>
                    <TouchableOpacity style={{justifyContent:"center"}} onPress={onConfirm}>
                        <Texts style={{color:MAIN_CONTRAST, fontSize:17}}>Ok</Texts>
                    </TouchableOpacity >
                    <TouchableOpacity style={{marginRight:20, justifyContent:"center"}} onPress={onCancel}>
                        <Texts style={{color:GREY, fontSize:17}}>Cancel</Texts>
                    </TouchableOpacity>
                </Row>
            </Column>
        </Center>
    </Modal>
});

export default Alert;