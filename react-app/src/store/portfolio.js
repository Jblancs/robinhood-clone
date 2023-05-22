

// Actions ----------------------------------------------------------------------
export const GET_PORTFOLIO = "portfolio/GET_PORTFOLIO";
export const CLEAR_PORT_STATE = "portfolio/CLEAR_PORT_STATE";

// Action creators --------------------------------------------------------------
export const getPortfolio = (payload) => {
    return {
        type: GET_PORTFOLIO,
        payload
    }
}

export const clearPortfolioState = () => {
    return {
        type: CLEAR_PORT_STATE,
    }
}


// Thunk functions --------------------------------------------------------------
export const fetchPortfolio = () => async (dispatch) => {
    const response = await fetch("/api/portfolio/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getPortfolio(data));
        return
    }
};

export const updatePortfolio = (transactionData) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getPortfolio(data));
    }
}

export const transferPortfolio = (transferData) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/transfer`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getPortfolio(data));
    }
}


// Reducer function -------------------------------------------------------------
const initialState = {};

export default function portfolioReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_PORTFOLIO:
            newState.portfolio = action.payload
            return newState

        case CLEAR_PORT_STATE:
            newState = { ...initialState }
            return newState

        default:
            return state;
    }
}
