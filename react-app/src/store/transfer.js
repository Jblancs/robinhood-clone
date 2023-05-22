
// Actions ----------------------------------------------------------------------
export const GET_TRANSFERS = "portfolio/GET_TRANSFERS";
export const ADD_TRANSFERS = "portfolio/ADD_TRANSFERS";
export const CLEAR_TRANSFER_STATE = "portfolio/CLEAR_TRANSFER_STATE";

// Action creators --------------------------------------------------------------
export const getTransfers = (payload) => {
    return {
        type: GET_TRANSFERS,
        payload
    }
}

export const clearTransferState = () => {
    return {
        type: CLEAR_TRANSFER_STATE,
    }
}

// Thunk functions --------------------------------------------------------------
export const fetchTransfers = () => async (dispatch) => {
    const response = await fetch("/api/transfer/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getTransfers(data));
        return data
    }
};

export const createTransfer = (transferData) => async (dispatch) => {
    const response = await fetch("/api/transfer/", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchTransfers())
        return data
    }
}


// Reducer function -------------------------------------------------------------
const initialState = {};

export default function transferReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_TRANSFERS:
            let transferList = {}
            if(action.payload.error){
                newState.transfers = {...action.payload}
            }else{
                action.payload.forEach((transfer) => {
                    transferList[transfer.id] = transfer
                })
                newState.transfers = {...transferList}
            }

            return newState

        case CLEAR_TRANSFER_STATE:
            newState = { ...initialState }
            return newState

        default:
            return state;
    }
}
