import React, { memo } from 'react'
import { StyleSheet, ImageBackground, View } from 'react-native'
import Row from '../Row';
import { LIGHT, WHITE, MAIN, GREY } from '../../Const/Colors';
import ButtonIconCircle from '../Button/ButtonIconCircle';

const ListAvatar = memo(({data, addButton, addButtonPress, containerStyle, maxShow, ...props}) => {


    if (maxShow == undefined)
      maxShow = 3;

    const readAvatar = () => {
      let avatar = [];
      for(let i = 0 ; i < data.length; i++){
        if(i == maxShow){
          break;
        } else {
          avatar.push(data[i])
        }
      }

      return avatar;
    }

    const styles = StyleSheet.create({
      tinyLogo: {
        width: 48,
        height: 48
      },
      logo: {
        width: 66,
        height: 58,
      },
    });
      let style = {
          ...styles.tinyLogo,
          ...props.style
      }

      if(data.length > 0)
        return <Row style={{...containerStyle}}>
                {
                  readAvatar().map((e, i) => {
                    if(i == 0)
                      return <ImageBackground key = {e+i}
                          style={style}
                          imageStyle={{ borderRadius: 25, borderColor:LIGHT, borderWidth: 2}}
                          source={e}
                      />
                    else 
                    return <ImageBackground key = {e+i}
                        style={{...style, marginLeft:-15}}
                        imageStyle={{ borderRadius: 25, borderColor:LIGHT, borderWidth: 2}}
                        source={e}
                    />
                  })
                }
                {(data.length > 0 && addButton) ? <ButtonIconCircle  rippleColor={GREY} style={{ elevation:0,
                    backgroundColor:WHITE, marginLeft:-15}} size={18} color={MAIN} icon="plus" onPress={addButtonPress} ></ButtonIconCircle> : null }
          </Row>
        else 
          return <Row style={{...containerStyle}}>
              <ButtonIconCircle  rippleColor={GREY} style={{ elevation:0,
              backgroundColor:WHITE, marginLeft:0}} size={18} color={MAIN} icon="plus" onPress={addButtonPress} ></ButtonIconCircle> 
            </Row>; 
    // }
});

export default ListAvatar;


