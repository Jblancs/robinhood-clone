import React, { useEffect, useState } from 'react';
import { useAccountNavSelect } from '../../context/AccountNav';

function Transfers(){
    const {setSelectedNav} = useAccountNavSelect()

    useEffect(() => {
        setSelectedNav('transfers')
    },[])

    return (
        <div>
            Transfers
        </div>
    )
}

export default Transfers
