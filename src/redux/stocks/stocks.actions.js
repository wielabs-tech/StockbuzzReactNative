import { stocksAPI } from "../../api/ajax";
import { GET_CRYPTO, GET_STOCK_FEED, GET_STOCK_INFO, GET_SUGGESTIONS, GET_TOP_TRENDING_STOCKS, GET_WATCHLIST_DATA } from "./stocks.types";

export const getTrendingStocksThunk = () => async dispatch => {
    const response = await stocksAPI.trendingStocks();
    dispatch({
        type: GET_TOP_TRENDING_STOCKS,
        payload: response
    })
}

export const getMyWatchlistDataThunk = (id) => async dispatch => {
    if (!!id) {
        const response = await stocksAPI.getWatchlistData(id);
        console.log("RESS", response)
        dispatch({
            type: GET_WATCHLIST_DATA,
            payload: response
        })
    }
}

export const getStockInfoThunk = (symbol) => async dispatch => {
    const response = await stocksAPI.getStockInfo(symbol);
    dispatch({
        type: GET_STOCK_INFO,
        payload: response.data
    })
}


export const getCryptoInfoThunk = (symbol) => async dispatch => {
    const response = await stocksAPI.getCryptoInfo(symbol);
    dispatch({
        type: GET_STOCK_INFO,
        payload: response.data.data,
        symbol: symbol
    })
}

export const getStockFeedThunk = (symbol) => async dispatch => {
    const response = await stocksAPI.getStockPosts(symbol);
    dispatch({
        type: GET_STOCK_FEED,
        payload: response.data
    })
}

export const getSuggestionsThunk = (startText) => async dispatch => {
    const response = await stocksAPI.getSuggestions(startText);
    dispatch({
        type: GET_SUGGESTIONS,
        payload: response.data
    })
}

export const setSuggestionEmptyThunk = (startText) => async dispatch => {
    const response = await stocksAPI.getSuggestions(startText);
    dispatch({
        type: GET_SUGGESTIONS,
        payload: response.data
    })
}

export const getCryptoThunk = () => async dispatch => {
    const response = await stocksAPI.getCryptos();
    dispatch({
        type: GET_CRYPTO,
        payload: response.data.data
    })
}