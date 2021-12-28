import { useSelector } from "react-redux";
import { stocksAPI } from "../../api/ajax";
import { CRYPTO_SEARCH, CRYPTO_SUGGESTIONS, GET_CRYPTO, GET_CRYPTO_WATCHLIST, GET_STOCK_FEED, GET_STOCK_INFO, GET_SUGGESTIONS, GET_TOP_TRENDING_STOCKS, GET_WATCHLIST_DATA } from "./stocks.types";

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
        payload: response.data,
        symbol: symbol
    })
}

export const getCryptoWatchlisthunk = (symbol) => async dispatch => {
    const response = await stocksAPI.getCryptoInfo(symbol);
    dispatch({
        type: GET_CRYPTO_WATCHLIST,
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

export const getCryptoSearchThunk  = () => async dispatch => {
    let responseJson = await stocksAPI.getCryptos();
    dispatch({
        type: CRYPTO_SEARCH,
        payload: responseJson?.data?.data
    })
}

export const getSuggestionsThunk = (startText) => async dispatch => {
    const response = await stocksAPI.getSuggestions(startText);
    dispatch({
        type: GET_SUGGESTIONS,
        payload: response.data
    })
}

export const getCryptoSuggestionsThunk = (startText, cryptos) => async dispatch => {

    dispatch({
        type: CRYPTO_SUGGESTIONS,
        payload: cryptos?.filter((country) => country.slug.startsWith(startText)).map(e => {
            const {symbol, slug, name} = e;
            return {symbol, slug, name};
          })
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
        payload: response.data?.data
    })
}