import React, { memo, useState, forwardRef, useEffect, useImperativeHandle } from 'react';
import { Modal } from 'react-native';
import Column from '../Column';

const BottomSheet = forwardRef(({visible, style, ...props}, ref) => {

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
        transparent={true}
        onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
            setBackgroundColor("");
            setModalVisible(false);
        }}

        // onShow={() => setBackgroundColor("rgba(0,0,0,0.3)")}
    >
        <Column reverse={true} style={{width:"100%", height:"100%", backgroundColor:backgroundColor}}>
            <Column  style={style}>
                {props.children}
            </Column>
        </Column>
    </Modal>
});

export default BottomSheet;