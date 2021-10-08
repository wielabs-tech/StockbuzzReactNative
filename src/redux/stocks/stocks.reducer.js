import { CRYPTO_SEARCH, CRYPTO_SUGGESTIONS, GET_CRYPTO, GET_STOCK_FEED, GET_STOCK_INFO, GET_SUGGESTIONS, GET_TOP_TRENDING_STOCKS, GET_WATCHLIST_DATA } from "./stocks.types";

const INITIAL_STATE = {
   topTrendingStocks: null,
   stockInfo: null,
   watchlistData: null,
   suggestions: null,
   stockFeed: null,
   stockSearch: null,
   cryptos: null,
   cryptoSuggestions: []
};

const reducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case GET_TOP_TRENDING_STOCKS:
         return {
            ...state,
            topTrendingStocks: action.payload,
         };

      case GET_STOCK_INFO:
         return {
            ...state,
            stockInfo: action.payload
         }

      case GET_WATCHLIST_DATA:
         return {
            ...state,
            watchlistData: action.payload
         }

      case GET_SUGGESTIONS:
         return{
            ...state,
            suggestions: action.payload
         }

      case GET_STOCK_FEED: 
         return{
            ...state,
            stockFeed: action.payload
         }

      case CRYPTO_SEARCH:
         return{
            ...state,
            stockSearch: action.payload
         }
         
      case GET_CRYPTO:
         return{
            ...state,
            cryptos: action.payload
         }

      case CRYPTO_SUGGESTIONS:
         return{
            ...state,
            cryptoSuggestions: action.payload
         }

      default:
         return state;
   }
};

export default reducer;