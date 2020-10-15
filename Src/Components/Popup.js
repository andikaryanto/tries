import { TouchableOpacity, UIManager, findNodeHandle, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import Texts from '../Components/Text';
import { MAIN_CONTRAST } from '../Const/Colors';
import { Text, Surface } from 'react-native-paper';

class PopupMenu extends React.Component {

  handleShowPopupError = () => {
    // show error here
  };

  handleMenuPress = () => {
    const { actions, onPress } = this.props;

    UIManager.showPopupMenu(
      findNodeHandle(this.refs.menu),
      actions,
      this.handleShowPopupError,
      onPress,
    );
  };

  render() {
    return (
      <View>
        {/* { this.props.children } */}
        <TouchableWithoutFeedback onPress={this.handleMenuPress}>
          {/* {this.props.children} */}
            <Surface ref="menu">
                {this.props.children}
            </Surface>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default PopupMenu;