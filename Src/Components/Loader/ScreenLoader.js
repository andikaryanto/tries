import React, { createRef } from 'react';
import Spinner from 'react-native-spinkit';
import { MAIN, WHITE } from '../../Const/Colors';
import { View } from 'react-native';
import Center from '../Center';
import Column from '../Column';
import Texts from '../Text';
export const loaderRef = createRef();

export function showScreenLoader(caption) {
    let ref = loaderRef.current
    if (ref) {
        ref.showScreenLoader(caption)
    }
}

export function hideScreenLoader() {
    let ref = loaderRef.current
    if (ref) {
        ref.hideScreenLoader()
    }
}

class ScreenLoader extends React.Component {

    constructor(props) {
        super(props)
        this.state = { loader: false, caption:"" }
        console.log(this.state);
    }

    showScreenLoader(caption) {
        this.setState({ loader: true, caption:caption })
    }

    hideScreenLoader() {
        this.setState({ loader: false, caption:"" })
    }

    render() {
        const { loader, caption } = this.state;
        if(loader){
            return (
                <View style={{ zIndex:1, width:"100%",height:"100%", position:"absolute", backgroundColor:"rgba(0,0,0, 0.3)"}}>
                    <Center>
                        <Column style={{height:100, minWidth:100, padding:10, backgroundColor:WHITE, borderRadius:15}}>
                            <Center>
                                {/* <Icon name={"save"} color={MAIN} size={36}></Icon> */}
                                <Texts style={{fontSize:15, color:MAIN}}>{caption}</Texts>
                                <Spinner isVisible={true} size={30} type={"ThreeBounce"} color={MAIN}/>
                            </Center>
                        </Column>
                    </Center>
                </View>
            );
        } else {
            return null
        }
    }
};

export default ScreenLoader;