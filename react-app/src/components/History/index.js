import React, { useEffect } from 'react';
import { useAccountNavSelect } from '../../context/AccountNav';

function History(){
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
