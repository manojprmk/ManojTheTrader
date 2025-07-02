import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, User, Portfolio, Order, Stock, MarketData } from '../types';

// Initial state
const initialState: AppState = {
  user: {
    id: '',
    name: '',
    email: '',
    isAuthenticated: false,
  },
  portfolio: [],
  orders: [],
  watchlist: [],
  marketData: {
    indices: [],
    topGainers: [],
    topLosers: [],
  },
  isLoading: false,
  error: null,
};

// App slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        id: '',
        name: '',
        email: '',
        isAuthenticated: false,
      };
    },
    setPortfolio: (state, action: PayloadAction<Portfolio[]>) => {
      state.portfolio = action.payload;
    },
    updatePortfolioItem: (state, action: PayloadAction<Portfolio>) => {
      const index = state.portfolio.findIndex(
        item => item.symbol === action.payload.symbol
      );
      if (index !== -1) {
        state.portfolio[index] = action.payload;
      } else {
        state.portfolio.push(action.payload);
      }
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    setWatchlist: (state, action: PayloadAction<Stock[]>) => {
      state.watchlist = action.payload;
    },
    addToWatchlist: (state, action: PayloadAction<Stock>) => {
      const exists = state.watchlist.find(stock => stock.symbol === action.payload.symbol);
      if (!exists) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(stock => stock.symbol !== action.payload);
    },
    setMarketData: (state, action: PayloadAction<MarketData>) => {
      state.marketData = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setUser,
  logout,
  setPortfolio,
  updatePortfolioItem,
  setOrders,
  addOrder,
  updateOrder,
  setWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  setMarketData,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;