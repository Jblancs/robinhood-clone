import React, { useEffect } from 'react';
import { useAccountNavSelect } from '../../context/AccountNav';

function Recurring(){
    const {setSelectedNav} = useAccountNavSelect()

    useEffect(() => {
        setSelectedNav('recurring')
    },[])

    return (
        <div>
            Recurring
        </div>
    )
}

export default Recurring
