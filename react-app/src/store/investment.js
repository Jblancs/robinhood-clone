

// Actions ----------------------------------------------------------------------
export const GET_ALL_INVESTMENTS = "Investments/GET_ALL_INVESTMENTS";
export const GET_ONE_INVESTMENT = "Investments/GET_ONE_INVESTMENT";
export const CLEAR_INV_STATE = "Investments/CLEAR_INV_STATE";

// Action creators --------------------------------------------------------------
export const getAllInvestments = (payload) => {
    return {
        type: GET_ALL_INVESTMENTS,
        payload
    }
}

export const getOneInvestment = (payload) => {
    return {
        type: GET_ONE_INVESTMENT,
        payload
    }
}

export const clearInvestmentState = () => {
    return {
        type: CLEAR_INV_STATE,
    }
}


// Thunk functions --------------------------------------------------------------
export const fetchAllInvestments = () => async (dispatch) => {
    const response = await fetch("/api/investments/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllInvestments(data));
    }
};

export const fetchStockInvestment = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/investments/${ticker}`);

    if (response.ok) {
        const data = await response.json();
        if (data.error) {
            return
        }
        dispatch(getOneInvestment(data));
    }
};

export const createInvestment = (ticker, transactionData) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${ticker}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(fetchStockInvestment(ticker))
        return data
    }
}

// Reducer function -------------------------------------------------------------

const initialState = { investments: null };

export default function investReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_ONE_INVESTMENT:
            let singleInvestment = {}
            singleInvestment[action.payload.ticker] = action.payload
            newState.investments = { ...singleInvestment }
            return newState

        case CLEAR_INV_STATE:
            return { ...initialState }
        default:
            return state;
    }
}