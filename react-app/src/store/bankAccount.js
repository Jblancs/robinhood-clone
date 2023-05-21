
// Actions ----------------------------------------------------------------------
export const GET_ACCOUNTS = "portfolio/GET_ACCOUNTS";
export const ADD_ACCOUNTS = "portfolio/ADD_ACCOUNTS";
export const CLEAR_ACCT_STATE = "portfolio/CLEAR_ACCT_STATE";

// Action creators --------------------------------------------------------------
export const getBankAccounts = (payload) => {
    return {
        type: GET_ACCOUNTS,
        payload
    }
}

export const addBankAccount = (payload) => {
    return {
        type: ADD_ACCOUNTS,
        payload
    }
}

export const clearBankAccountState = () => {
    return {
        type: CLEAR_ACCT_STATE,
    }
}

// Thunk functions --------------------------------------------------------------
export const fetchBankAccounts = () => async (dispatch) => {
    const response = await fetch("/api/bank_account/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getBankAccounts(data));
        return
    }
};

export const createBankAccount = (bankData) => async (dispatch) => {
    const response = await fetch("/api/bank_account/", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bankData)
    })
    console.log("createBankAccount thunk response ------------", response)

    if (response.ok) {
        const data = await response.json();
        console.log("createBankAccount Thunk ------------", data)
        if(data.errors || data.link){
            return data

        }else{
            dispatch(fetchBankAccounts());
            return data
        }
    }
}

export const updateBankAccount = (id) => async (dispatch) => {
    const response = await fetch(`/api/bank_account/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchBankAccounts());
        return
    }
}

// Reducer function -------------------------------------------------------------
const initialState = {};

export default function bankReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_ACCOUNTS:
            let bankAccountList = {}
            if(action.payload.error){
                newState.bank = {...action.payload}
            }else{
                action.payload.forEach((bank) => {
                    bankAccountList[bank.id] = bank
                })
                newState.bank = {...bankAccountList}
            }
            return newState

        case CLEAR_ACCT_STATE:
            newState = { ...initialState }

        default:
            return state;
    }
}
