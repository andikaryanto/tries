import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { render } from 'react-dom';
import { RandomString } from '../../Helper/General';
function PilTabBar({ state, descriptors, navigation, position, component, activeColor }) {
  // console.log(state.index);
    // this.flatlist
    // return (
    //   <View>
    //     <FlatList onRef={(ref) => {this.flatlist = ref;}} data={data} renderItem={renderItem} horizontal={true} showsHorizontalScrollIndicator={false}>
    //       </FlatList>
    //   </View>
    // )
    const scrollViewRef = useRef(null)

    useEffect(() => {
        scrollViewRef.current.scrollTo({ x: state.index  * 100, y: 0, animated: true })
    }, [state.index])
    return (
      <View>
        <ScrollView ref={(ref) => {scrollViewRef.current = ref;}} horizontal={true} showsHorizontalScrollIndicator={false}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            // const label = route.name;
    
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
            // modify inputRange for custom behavior
            const inputRange = state.routes.map((_, i) => i);
            const opacity = Animated.interpolate(position, {
              inputRange,
              outputRange: inputRange.map(i => (i === index ? 1 : 0)),
            });
            // return null;
            // return <> {component[index]}</>
            let currentComponet = null;
            if(!isFocused)
                currentComponet = component[index];
            else {
                currentComponet = React.cloneElement(component[index], {style: {...component[index].props.style, backgroundColor:activeColor}})
            }
            return (
              <TouchableOpacity
                key={RandomString(10)}
                delayPressIn={50}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                // style={{ flex: 1 }}
              >
                {/* <Animated.Text style={{ opacity }}>{label}</Animated.Text> */}
                {currentComponet}
              </TouchableOpacity>
            );
          })}
          </ScrollView>
      </View>
    );
  }

  export default PilTabBar;