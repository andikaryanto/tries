import React, { memo } from 'react'
import Row from '../Row'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import Column from '../Column';
import { MAIN_SECOND, MAIN } from '../../Const/Colors';
import { Title } from 'native-base';
import ButtonIcon from '../Button/ButtonIcon';
import ButtonIconCircle from '../Button/ButtonIconCircle';
const Header  = memo(({  transparent, children, left, actions, title, style, ...props }) => {


    const { ...other } = styleAll.column;
    
    let styles = {
        // backgroundColor : background,
        ...other,
        ...style
    }
    // children.map((e, i) => {
    //     console.log(e);
    //     return;
    // });
    return <Column style={styles}>
            {children}
            {/* {<Row style={styleAll.row}>
                <Row >
                    {left}
                    <Column align="center" style={{justifyContent:"center"}}>
                        {title}
                    </Column>
                </Row>
                <Column align="center" style={{justifyContent:"center"}}>
                    <Row>
                        {actions}
                    </Row>
                </Column>
            </Row>} */}
        </Column>
})

export default Header;

const styleAll = StyleSheet.create({
    row : {
        justifyContent: 'space-between'
    },
    column:{
        paddingLeft:10,
        paddingRight:10,
        paddingTop:32,
        paddingBottom:7,
        justifyContent:"center",
        
    }
});
