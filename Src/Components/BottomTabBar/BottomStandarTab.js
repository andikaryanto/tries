import React from 'react';
import { View, Text, TouchableOpacity,  } from 'react-native';
import { min } from 'react-native-reanimated';
import { MAIN, GREY, MAIN_CONTRAST, MAIN_FONT, MAIN_FOURTH, LIGHT, WHITE } from '../../Const/Colors';
import Texts from '../Text'
import Icon  from 'react-native-vector-icons/Entypo';
import Center from '../Center';
import Column from '../Column';
import { TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RandomString } from '../../Helper/General';

function BottomStandarTab({ state, descriptors, navigation, position, tabTitle, style, activeColor, inactiveColor }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
  
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
  
    return (
      <View style={{ flexDirection: 'row',alignItems:"center", justifyContent:"space-between", paddingVertical:5, paddingHorizontal:20,  elevation:10, ...style }}>
        
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
    
            const onPress = () => {

            // console.log(flatlist);
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
          
            let currentComponet = null;
            if(!isFocused)
                currentComponet = <Column style={{ alignItems:"center", paddingLeft:2, paddingRight:10, paddingVertical:2, marginRight:10, borderRadius:25}}>
           
                <Icon color={inactiveColor} size={20} name={tabTitle[index].icon} ></Icon>
                <Texts style={{fontSize:14, color:inactiveColor}}>{tabTitle[index].name}</Texts>
            </Column>;
            else {
                currentComponet = <Column style={{ alignItems:"center", paddingLeft:2, paddingRight:10, paddingVertical:2, marginRight:10, borderRadius:25}}>
           
                <Icon color={activeColor} size={20} name={tabTitle[index].icon} ></Icon>
                <Texts style={{fontSize:14, color:activeColor}}>{tabTitle[index].name}</Texts>
            </Column>;
            }
            return (<Center key={RandomString(10)}>
              <TouchableWithoutFeedback
                delayPressIn={50}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                // background={TouchableNativeFeedback.Ripple(MAIN, true)}
                // style={{ flex: 1 }}
              >
                {/* <Animated.Text style={{ opacity }}>{label}</Animated.Text> */}
                {currentComponet}
              </TouchableWithoutFeedback>
          </Center>
            );
          })}
      </View>
    );
  }

  export default BottomStandarTab;