import React, { memo, useState, useEffect, useRef } from 'react';
import Column from '../Column';
import Texts from '../Text';
import Row from '../Row';
import ButtonIconCircle from '../Button/ButtonIconCircle';
import { ScrollView, FlatList } from 'react-native';
import CardRounded from '../Card/CardRounded';
import { getDay, getMonth} from '../../Helper/Date';
import { MAIN, WHITE, LIGHT } from '../../Const/Colors';
import Center from '../Center';
import { Dimensions } from 'react-native'

const CalendarStraight = memo(({buttonColor, textColor, fontSize, onSelect, activeColor, activeTextColor, initValue, ...props}) => {

    let today = null;
    today = new Date(initValue);
    let days = [];

    const win = Dimensions.get("window");

    const scrollViewRef = useRef(null);

    const [selectedDate , setSelectedDate] = useState(today);
    let lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+1, 0);

    let style= {
        ...props.style,
        marginRight:10
    }
    for(let i = 1; i <= lastDayOfMonth.getDate(); i++){
        days.push({Id:i.toString(), Value:i});
    }
    

    let textPaddingHorizontal = props.style.paddingHorizontal;


    const onNext = () => {
        let month = selectedDate.getMonth() + 1;
        let year = selectedDate.getFullYear();

        if(year == 12){
            year++;
            month = 1;
        }

        let selectDate = new Date(year, month, 1);

        // scrollViewRef.current.scrollToOffset({ offset: (selectedDate.getDate() - 1) *  55, animated: true})
        setSelectedDate(selectDate);
    }

    const onPrev = () => {
        let month = selectedDate.getMonth() - 1;
        let year = selectedDate.getFullYear();

        if(year == 1){
            year = 1;
            month = 12;
        }

        let selectDate = new Date(year, month, 1);
        // scrollViewRef.current.scrollToOffset({ offset: (selectedDate.getDate() - 1) *  55,animated: true})
        setSelectedDate(selectDate);
    }
    
    const selectDate = (date) => {
        let selectDate = new Date(date);
        selectDate.setDate(selectDate.getDate() + 1);
        onSelect(selectDate);
        selectDate.setDate(selectDate.getDate() - 1)
        setSelectedDate(selectDate);
        
    }

    const renderCalendar = ({item, index}) => {
        let marginLeft = 0;
        let setDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() , index + 1);
        if(index == 0){
            marginLeft= textPaddingHorizontal;
        }   
        let datebackground = selectedDate.getDate() == (index+1) ? activeColor : activeTextColor;
        let datecolor = selectedDate.getDate() == (index+1) ? activeTextColor : textColor;
        return <CardRounded key={index}
            onPress={() => selectDate(setDate)}
            style={{backgroundColor:datebackground,marginRight:5, marginLeft:marginLeft, width:60}}>
                <Column align={"center"}>

                    <Texts style={{color:datecolor, fontSize:25}}>{index+1}</Texts>
                    <Texts style={{color:datecolor, fontSize:15, marginTop:5}}>{getDay(setDate.getDay()+1).substr(0, 3)}</Texts>
    
                </Column>
        </CardRounded>
    }
    useEffect(() => {
        console.log(selectedDate.getDate());
        scrollViewRef.current.scrollToOffset({ offset: (selectedDate.getDate() - 1) * 55,animated: true,})
        // scrollViewRef.current.scrollToIndex({ index: 1,animated: true,})
    },[selectedDate]);

    return <Column >
        <Row style={{justifyContent:"space-between", alignItems:"center", paddingHorizontal:textPaddingHorizontal, marginBottom:10}}>
            <Texts style={{color:textColor, fontSize:fontSize}}>{selectedDate.getDate()} {getMonth(selectedDate.getMonth() + 1)} {selectedDate.getFullYear()}</Texts>
            <Row style={{}}>
                <ButtonIconCircle onPress={onPrev} rippleColor={buttonColor} color={buttonColor} width={32} size={25}icon={"chevron-small-left"}/>
                <ButtonIconCircle onPress={onNext} rippleColor={buttonColor} color={buttonColor}  width={32} size={25}icon={"chevron-small-right"}/>
            </Row>
        </Row>
        <FlatList  keyExtractor={item => item.Id} data={days} renderItem={renderCalendar} ref={(ref) => {scrollViewRef.current = ref;}} horizontal={true} showsHorizontalScrollIndicator={false}>

            {/* {
                days.map((e, i) => {
                    
                })
            } */}
        </FlatList>
    </Column>
});

export default CalendarStraight;