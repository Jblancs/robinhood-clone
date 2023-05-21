import React, { useEffect } from 'react';
import { useAccountNavSelect } from '../../context/AccountNav';

function History(){
    const {setSelectedNav} = useAccountNavSelect()

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
