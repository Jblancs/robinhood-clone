import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { useAccountNavSelect } from '../../context/AccountNav';
import { useHistory } from 'react-router-dom';
import { clearTransferState, fetchTransfers } from '../../store/transfer';

function History(){
    const history = useHistory()
    const dispatch = useDispatch()
    const {setSelectedNav} = useAccountNavSelect()
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        setSelectedNav('history')
    },[])

    useEffect(() => {
        dispatch(fetchTransfers())
        return () => {
            dispatch(clearTransferState())
        }
    }, [dispatch])

    if (!user) {
        history.push("/login")
    }

    return (
        <div>
            History
        </div>
    )
}

export default History
