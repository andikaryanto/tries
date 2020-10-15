import React from 'react'
import { TextInput, Easing } from 'react-native';
import { View } from 'native-base';
import Texts from '../Text';
import Stack from '../Stack';
import Animated from 'react-native-reanimated';
class FloatingLabel extends React.Component{
    constructor(props){
        super();
        this.state={
          animation : new Animated.Value(15),
        }
    }

    startAnimation=()=>{
        Animated.timing(this.state.animation,{
            toValue : 0,
            duration : 2000,
            easing: Easing.back()
        }).start();
    
    }

    render(){
        return <Stack>
                <Animated.Text style={{top:15, fontSize:18}, {top:this.state.animation, fontSize:15}}>asdasd</Animated.Text>
                <TextInput
                    {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                    editable
                    maxLength={40}
                    onFocus={this.startAnimation}
                />

        </Stack>
    }
}

export default FloatingLabel;