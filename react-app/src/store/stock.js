

// Actions ----------------------------------------------------------------------
export const GET_STOCK = "stock/GET_STOCK";
export const CLEAR_STOCK_STATE = "stock/CLEAR_STOCK_STATE";

// Action creators --------------------------------------------------------------
export const getStock = (payload) => {
    return {
        type: GET_STOCK,
        payload
    }
}

export const clearStockState = () => {
    return {
        type: CLEAR_STOCK_STATE,
    }
}


// Thunk functions --------------------------------------------------------------
export const fetchStock = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stock/${ticker}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getStock(data));
        return
    }
};

export const addStock = (stockData) => async (dispatch) => {
    const response = await fetch(`/api/stock/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockData)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(getStock(data));
        return data
    }
}


// Reducer function -------------------------------------------------------------
const initialState = { stock: null };

export default function stockReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_STOCK:
            newState.stock = action.payload
            return newState

        case CLEAR_STOCK_STATE:
            newState = { ...initialState }
            return newState

        default:
            return state;
    }
}
