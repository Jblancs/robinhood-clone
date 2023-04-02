

// Actions ----------------------------------------------------------------------
export const GET_ALL_INVESTMENTS = "Investments/GET_ALL_INVESTMENTS";
export const GET_ONE_INVESTMENT = "Investments/GET_ONE_INVESTMENT";
export const DELETE_INVESTMENT = "Investments/DELETE_INVESTMENT";
export const CLEAR_INV_STATE = "Investments/CLEAR_INV_STATE";

// Action creators --------------------------------------------------------------
export const getAllInvestments = (payload) => {
    return {
        type: GET_ALL_INVESTMENTS,
        payload
    }
}

export const getOneInvestment = (payload, ticker) => {
    return {
        type: GET_ONE_INVESTMENT,
        payload,
        ticker
    }
}

export const deleteInvestment = (ticker) => {
    return {
        type: DELETE_INVESTMENT,
        ticker
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
        dispatch(getOneInvestment(data, ticker));
        return data
    }
};

export const createInvestment = (ticker, transactionData) => async (dispatch) => {
    const response = await fetch(`/api/investments/${ticker}`, {
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

export const updateInvestment = (ticker, transactionData) => async (dispatch) => {
    const response = await fetch(`/api/investments/${ticker}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(fetchStockInvestment(ticker))
        return data
    }
}

export const sellAllInvestments = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/investments/${ticker}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        const data = await response.json()
        console.log("delet inv thunk",data)

        dispatch(deleteInvestment(ticker))
        return data
    }
}



// Reducer function -------------------------------------------------------------

const initialState = { investments: null };

export default function investReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_INVESTMENTS:
            let investmentList = {}
            action.payload.forEach((investment) => {
                investmentList[investment.ticker] = investment
            })
            newState.investments = {...investmentList}
            return newState

        case GET_ONE_INVESTMENT:
            let singleInvestment = {}
            console.log("inv reducer~~~",action)
            if(action.payload.ticker){
                singleInvestment[action.payload.ticker] = action.payload
                newState.investments = { ...singleInvestment }
                return newState
            }else{
                newState.investments = {...action.payload}
                return newState
            }

        case DELETE_INVESTMENT:
            newState = {...initialState}
            return newState

        case CLEAR_INV_STATE:
            return { ...initialState }

        default:
            return state;
    }
}
