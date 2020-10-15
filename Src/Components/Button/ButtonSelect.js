import React, { memo, useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { Dimensions } from 'react-native';
const ButtonSelect = memo(({style, children, selectedColor, unselectedColor,  data, mode, ...props}) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        setList(data);
    }, [])

    const onCategoryClick = (choosen) => (e) => {
        // console.log(current, choosen)
        // current.selected = false;
        // choosen.selected = true;
        // this.setState({});
        let newData = list.map((e, i) => {
            if(e.text == choosen.text){
                e.selected = true;
            } else {
                e.selected = false
            }
            return e;
        });

        setList(newData);
    }

    let styles = {
        ...style,
        width:"100%"
    }
    let buttonSelected = null;
    return list.map((e, i) => {

        if(e.selected){
            return <Button key={e+i} mode={mode}
                    color={selectedColor} 
                    uppercase={false} 
                    style={{marginLeft: i == 0 ? 20 : 0, marginRight:10, borderRadius:20}}  
                    onPress={onCategoryClick(e)}>
                {e.text}
            </Button>
        } else {
            return <Button key={e+i} 
                mode={mode}
                color ={unselectedColor} 
                uppercase={false} 
                style={{marginLeft: i == 0 ? 20 : 0, marginRight:10, borderRadius:20}} 
                onPress={onCategoryClick(e)}>
                {e.text}
            </Button>
        }
        
    })
})

export default ButtonSelect;