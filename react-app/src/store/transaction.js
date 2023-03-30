

// Actions ----------------------------------------------------------------------
export const GET_ALL_TRANSACTIONS = "Investments/GET_ALL_TRANSACTIONS";
export const CREATE_TRANSACTIONS = "Investments/CREATE_TRANSACTIONS";
export const CLEAR_TRANS_STATE = "Investments/CLEAR_TRANS_STATE";

// Action creators --------------------------------------------------------------
export const getAllTransactions = (payload) => {
    return {
        type: GET_ALL_TRANSACTIONS,
        payload
    }
}

export const clearTransactionState = () => {
    return {
        type: CLEAR_TRANS_STATE,
    }
}


// Thunk functions --------------------------------------------------------------
export const fetchAllTransactions = (ticker) => async (dispatch) => {
    let response;
    if (!ticker) {
        response = await fetch("/api/transactions/");
    } else {
        response = await fetch(`/api/transactions/${ticker}`);
    }

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllTransactions(data));
        return
    }
};

export const createTransaction = (ticker, transactionData) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${ticker}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData)
    })


    if (response) {
        const data = await response.json()
        if (!data.errors) {
            dispatch(fetchAllTransactions(ticker))
            return data
        }
        return data
    }
}

// Reducer function -------------------------------------------------------------

const initialState = { transactions: null };

export default function transactionReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_TRANSACTIONS:
            let transactions = {}
            action.payload.forEach(trans => {
                transactions[trans.id] = trans
            })
            newState.transactions = { ...transactions }
            return newState

        case CLEAR_TRANS_STATE:
            return { ...initialState }
        default:
            return state;
    }
}
