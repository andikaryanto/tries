import React from 'react'
import { ScrollView } from 'react-native';
class NestedScrollView extends React.Component{
    constructor() {
		super();
		this.state = {
			content: {}
		};
    }
    
     render(){
        return <ScrollView
            onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
            onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
            onScrollEndDrag={(e) => { this.setState({ content: {} }); }}>
            {this.props.children}
        </ScrollView>
     }
}

export default NestedScrollView;