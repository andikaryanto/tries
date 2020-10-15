import React from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import Foundation from '../Src/Components/Foundation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Test extends React.Component {
  render(){
    return <KeyboardAwareScrollView>
        <Foundation>
            <Text>asdadasdsa</Text>
        </Foundation>
    </KeyboardAwareScrollView>
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});

export default Test;
