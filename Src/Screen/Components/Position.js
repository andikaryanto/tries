import React, { memo, useState, useEffect } from 'react';
import { getPosition } from '../../Storage/Users';
import Texts from '../../Components/Text'
import { GREY } from '../../Const/Colors';

const Position = memo(({ startText,...props}) => {
    const [position, setPosition] = useState("");

    useEffect(() => {
        getPosition()
        .then(position => {
            setPosition(position)
        })
        .catch(err => {
            setPosition("");
        })
    }, []);


    return <Texts style={{fontSize:15, color:GREY}}>{position || "Position hasnt been set"} </Texts>
})

export default Position;