import React, { memo, useState, useEffect } from 'react';
import { getUsername } from '../../Storage/Users';
import Texts from '../../Components/Text'

const Username = memo(({ startText,...props}) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUsername()
        .then(username => {
            setUsername(username)
        })
    }, []);

    let beforeText  = (startText != undefined && startText !="") ? startText + ", " : "";

    return <Texts {...props}>{beforeText}{username}</Texts>
})

export default Username;