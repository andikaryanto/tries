import React, { memo } from 'react'
import Center from '../Center';
import Spinner from 'react-native-spinkit';
import Texts from '../../Components/Text';
import { Image } from 'react-native';
import { MAIN } from '../../Const/Colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import SwipeableFlatList from 'react-native-swipeable-list';
const LisDataSwipeable = memo(({isLoading, data, renderItem, ...props}) => {
    // if(isLoading){
    //     // setRefreshing(true);
    //     return  <Center align="center" style={{flex:1}}>
    //         <Spinner isVisible={true} size={32} type={"FadingCircleAlt"} color={MAIN}/>
    //         <Texts style={{marginTop:10}}>Loading Data</Texts>
    //     </Center>
    // } else {
        if(data.length == 0 && !isLoading){
            // return <Texts>asdadasd</Texts>;
            return <ScrollView   {...props}>
                <Center align="center" style={{flex:1, paddingHorizontal:20}}>
                    <Image source={require('../../Assets/Img/cactus.png')} style={{ width: 250,height: 250,}}></Image>
                    <Texts style={{marginTop:10, fontSize:50, marginBottom:5}}>Whoops.... : (</Texts>
                    <Texts style={{marginTop:10, fontSize:18}}>We cannot find the data you are looking for. Please create one or refresh this page.</Texts>
                </Center>
        </ScrollView>
        }   

        

        return (
            
                <SwipeableFlatList renderItem={renderItem} data={data} {...props} />
        )  
    // }
});

export default LisDataSwipeable;