
// Actions ----------------------------------------------------------------------
export const GET_RECURRING = "portfolio/GET_RECURRING";
export const ADD_RECURRING = "portfolio/ADD_RECURRING";
export const CLEAR_RECUR_STATE = "portfolio/CLEAR_RECUR_STATE";

// Action creators --------------------------------------------------------------
export const getRecurringInv = (payload) => {
    return {
        type: GET_RECURRING,
        payload
    }
}

export const addRecurringInv = (payload) => {
    return {
        type: ADD_RECURRING,
        payload
    }
}

export const clearRecurringState = () => {
    return {
        type: CLEAR_RECUR_STATE,
    }
}

// Thunk functions --------------------------------------------------------------
export const fetchRecurringInv = () => async (dispatch) => {
    const response = await fetch("/api/recurring_investment/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getRecurringInv(data));
        return data
    }
};

export const createBankAccount = (bankData) => async (dispatch) => {
    const response = await fetch("/api/recurring_investment/", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bankData)
    })

    if (response.ok) {
        const data = await response.json();
        if (data.errors || data.link) {
            return data

        } else {
            dispatch(fetchRecurringInv());
            return data
        }
    }
}

export const updateRecurringInv = (id, data) => async (dispatch) => {
    const response = await fetch(`/api/recurring_investment/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchRecurringInv());
        return data
    }
}

export const deleteRecurringInv = (id) => async (dispatch) => {
    const response = await fetch(`/api/recurring_investment/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchRecurringInv());
        return data
    }
}

// Reducer function -------------------------------------------------------------
const initialState = { recurring: null };

export default function bankReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_ACCOUNTS:
            let recurringInvList = {}
            if (action.payload.error) {
                newState.bank = { ...action.payload }
            } else {
                action.payload.forEach((inv) => {
                    recurringInvList[inv.id] = inv
                })
                newState.bank = { ...recurringInvList }
            }
            return newState

        case CLEAR_ACCT_STATE:
            newState = { ...initialState }
            return newState

        default:
            return state;
    }
}
