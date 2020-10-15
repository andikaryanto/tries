import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button } from "react-native";

const AnimationExample = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const postionAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver:true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver:true,
    }).start();
  };

  const top = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(postionAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver:true,
    }).start();
  };

  
  const bottom = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(postionAnim, {
      toValue: 100,
      duration: 5000,
      useNativeDriver:true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // opacity: fadeAnim // Bind opacity to animated value
            padding:postionAnim
          }
        ]}
      >
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
        <Button title="Top" onPress={top} />
        <Button title="Bottom" onPress={bottom} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  }
});

export default AnimationExample;
