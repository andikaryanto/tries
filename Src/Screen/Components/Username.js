import React, { memo, useState, useEffect } from 'react';
import { getUsername } from '../../Storage/Users';
import Texts from '../../Components/Text'
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
    const { screen } = state;
    return {
        screen:screen
    }
}


// const mapDispatchToProps = { setMineTask, screenLoading }

export default connect(
    mapStateToProps,
null
)(Username);