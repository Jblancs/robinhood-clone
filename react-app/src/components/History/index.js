import React, { useEffect } from 'react';
import { useSelector } from "react-redux"
import { useAccountNavSelect } from '../../context/AccountNav';
import { useHistory } from 'react-router-dom';

function History(){
    const history = useHistory()
    const {setSelectedNav} = useAccountNavSelect()
    const user = useSelector(state => state.session.user)

    if (!user) {
        history.push("/login")
    }

    useEffect(() => {
        setSelectedNav('history')
    },[])

    return (
        <div>
            History
        </div>
    )
}

export default History
