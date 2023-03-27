

// Actions ----------------------------------------------------------------------
export const GET_HISTORY = "history/GET_HISTORY";
export const CLEAR_HISTORY_STATE = "history/CLEAR_HISTORY_STATE";


// Action creators --------------------------------------------------------------
export const getPortfolioHistory = (payload) => {
    return {
        type: GET_HISTORY,
        payload
    }
}

export const clearHistoryState = () => {
    return {
        type: CLEAR_HISTORY_STATE,
    }
}


// Thunk functions --------------------------------------------------------------
export const fetchHistory = () => async (dispatch) => {
    const response = await fetch("/api/portfolio_history/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getPortfolioHistory(data));
    }
};

const initialState = { history: null };

export default function historyReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_HISTORY:
            let historyList = {}
            action.payload.forEach((history) => {
                historyList[history.id] = history
            })
            newState.history = {...historyList}
            return newState

        case CLEAR_HISTORY_STATE:
            return {...initialState}

        default:
            return state;
        }
    }
