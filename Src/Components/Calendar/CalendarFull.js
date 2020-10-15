import React, { memo, useState, useEffect, useRef } from 'react';
import Column from '../Column';
import Texts from '../Text';
import Row from '../Row';
import ButtonIconCircle from '../Button/ButtonIconCircle';
import { ScrollView, Dimensions } from 'react-native';
import CardRounded from '../Card/CardRounded';
import { getDay, getMonth} from '../../Helper/Date';
import { MAIN, WHITE, LIGHT } from '../../Const/Colors';
import Center from '../Center';
import ButtonIconRounded from '../Button/ButtonIconRounded';
import ButtonCircle from '../Button/ButtonCircle';

const CalendarFull = memo(({buttonColor, textColor, fontSize, onSelect, ...props}) => {

    let dimension = Dimensions.get("screen");

    let today = null;
    today = new Date();
    let days = [];

    // const scrollViewRef = useRef(null);

    const [selectedDate , setSelectedDate] = useState(today);
    let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    let lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    let style= {
        ...props.style,
        marginRight:10
    }

    for(let i = 1; i <= lastDayOfMonth.getDate(); i++){
        days.push(i);
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

        // scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
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
        // scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
        setSelectedDate(selectDate);
    }
    
    const selectDate = (date) => {
        // if(selectedDate != date){

            let selectDate = new Date(date);
            selectDate.setDate(selectDate.getDate() + 1);
            onSelect(selectDate);
            selectDate.setDate(selectDate.getDate() - 1)
            setSelectedDate(selectDate);
        // }
        
    }

    const createCalendar = () => {
        let week = [];
        let day = firstDayOfMonth.getDay() + 1;
        let lastInserted = 1;
        let isStart = true;
        [1,2,3,4,5].forEach((e, i) => {
            let days = [];
            [1,2,3,4,5,6,7].forEach((f, j) => {
                if(isStart){
                    if(day == f){
                        isStart = false;
                        if(lastInserted <= lastDayOfMonth.getDate()){
                            days.push(lastInserted.toString());
                            lastInserted++;
                        }
                    } else {
                        days.push("");
                    }
                } else {                    
                    if(lastInserted <= lastDayOfMonth.getDate()){
                        days.push(lastInserted.toString());
                        lastInserted++;
                    } else {
                        days.push("");
                    }
                }
            })
            week.push(days);
        })
        // console.log(week);
        return week;

    }

    // createCalendar();

    // useEffect(() => {
    //     // `setSelectedDate(today);
    // },[selectedDate])

    return <Column >
        <Row style={{justifyContent:"space-between", alignItems:"center", paddingHorizontal:textPaddingHorizontal, marginBottom:10}}>
            <Texts style={{color:textColor, fontSize:fontSize}}>{selectedDate.getDate()} {getMonth(selectedDate.getMonth() + 1)} {selectedDate.getFullYear()}</Texts>
            <Row style={{}}>
                <ButtonIconCircle onPress={onPrev} rippleColor={buttonColor} color={buttonColor} width={32} size={25}icon={"chevron-small-left"}/>
                <ButtonIconCircle onPress={onNext} rippleColor={buttonColor} color={buttonColor}  width={32} size={25}icon={"chevron-small-right"}/>
            </Row>
        </Row>
        <Column style={{paddingHorizontal:textPaddingHorizontal}}>
            <Row style={{justifyContent:"space-between", alignItems:"center"}}>
                <Column key={"Sun"} style={{ width:36}} align={"center"}><Texts style={{fontSize:16, color:textColor}}>Sun</Texts></Column>
                <Column key={"Mon"} style={{ width:36}} align={"center"}><Texts style={{fontSize:16, color:textColor}}>Mon</Texts></Column>
                <Column key={"Thu"} style={{ width:36}} align={"center"}><Texts style={{fontSize:16, color:textColor}}>Tue</Texts></Column>
                <Column key={"Wed"} style={{ width:36}} align={"center"}><Texts style={{fontSize:16, color:textColor}}>Wed</Texts></Column>
                <Column key={"Tue"} style={{ width:36}} align={"center"}><Texts style={{fontSize:16, color:textColor}}>Thu</Texts></Column>
                <Column key={"Fri"} style={{ width:36}} align={"center"}><Texts style={{fontSize:16, color:textColor}}>Fri</Texts></Column>
                <Column key={"Sat"} style={{ width:36}} align={"center"}><Texts style={{fontSize:16, color:textColor}}>Sat</Texts></Column>
            </Row>
                {
                    createCalendar().map((e, i) => {
                        return <Row key={i} style={{justifyContent:"space-between", alignItems:"center", marginTop:15}}>
                            { 
                                e.map((f, j) => {
                                // console.log(f);
                                if(f == ''){
                                    return <Texts style={{color:fontColor, fontSize:16, width:36}}>{f}</Texts>
                                }

                                let setDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() , parseInt(f) );
                                let color = f == selectedDate.getDate() ? MAIN : null
                                let fontColor = f == selectedDate.getDate() ? WHITE : MAIN
                                return <ButtonCircle onPress={() => selectDate(setDate)} color={color} width={36} align={"center"} >
                                    <Texts style={{color:fontColor, fontSize:16}}>{f}</Texts>
                                    </ButtonCircle>
                                })
                            }
                            </Row>
                    })
                }
        </Column>
        {/* <ScrollView ref={(ref) => {scrollViewRef.current = ref;}} horizontal={true} showsHorizontalScrollIndicator={false}>

            {
                days.map((e, i) => {
                    let marginLeft = 0;
                    let setDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() , i + 1);
                    if(i == 0){
                        marginLeft= textPaddingHorizontal;
                    }   
                    let datebackground = selectedDate.getDate() == (i+1) ? MAIN : LIGHT;
                    let datecolor = selectedDate.getDate() == (i+1) ? LIGHT : MAIN;
                    return <CardRounded key={i}
                        onPress={() => selectDate(setDate)}
                        style={{backgroundColor:datebackground,marginRight:5, marginLeft:marginLeft, width:60}}>
                            <Column align={"center"}>

                                <Texts style={{color:datecolor, fontSize:25}}>{i+1}</Texts>
                                <Texts style={{color:datecolor, fontSize:15, marginTop:5}}>{getDay(setDate.getDay()+1).substr(0, 3)}</Texts>
                
                            </Column>
                    </CardRounded>
                })
            }
        </ScrollView> */}
    </Column>
});

export default CalendarFull;