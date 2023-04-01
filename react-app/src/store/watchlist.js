

// Actions ----------------------------------------------------------------------
export const GET_WATCHLISTS = "watchlists/GET_WATCHLISTS";
export const ADD_WATCHLISTS = "watchlists/ADD_WATCHLISTS";
export const UPDATE_WATCHLISTS = "watchlists/UPDATE_WATCHLISTS";
export const DELETE_WATCHLISTS = "watchlists/DELETE_WATCHLISTS";
export const CLEAR_WATCH_STATE = "watchlists/CLEAR_WATCH_STATE";

// Action creators --------------------------------------------------------------
export const getWatchlists = (payload) => {
    return {
        type: GET_WATCHLISTS,
        payload
    }
}

export const updateWatchlists = (payload) => {
    return {
        type: UPDATE_WATCHLISTS,
        payload
    }
}

export const removeWatchlists = (watchlistId) => {
    return {
        type: DELETE_WATCHLISTS,
        watchlistId
    }
}

export const clearWatchlistsState = () => {
    return {
        type: CLEAR_WATCH_STATE,
    }
}


// Thunk functions --------------------------------------------------------------
export const fetchWatchlists = () => async (dispatch) => {
    const response = await fetch("/api/watchlists/");

    if (response.ok) {
        const data = await response.json();
        dispatch(getWatchlists(data));
    }
};

export const createWatchlists = (watchlistInfo) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watchlistInfo)
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchWatchlists());
        return data
    }
}

export const updateWatchlistsName = (watchlistInfo, id) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(watchlistInfo)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(fetchWatchlists());
    }
}

export const deleteWatchlists = (id) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(fetchWatchlists());
    }
}

// Reducer function -------------------------------------------------------------
const initialState = { watchlists: null };

export default function watchlistsReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_WATCHLISTS:
            let watchlist = {}
            action.payload.forEach(list => {
                watchlist[list.id] = list
            })
            newState.watchlists = watchlist
            return newState

        case CLEAR_WATCH_STATE:
            newState = { ...initialState }

        default:
            return state;
    }
}
