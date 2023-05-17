
// Actions ----------------------------------------------------------------------
export const GET_TRANSFERS = "portfolio/GET_TRANSFERS";
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
        return
    }
};


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

        default:
            return state;
    }
}
