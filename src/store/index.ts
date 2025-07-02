import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface Stock {
  symbol: string;
  name: string;
  ltp: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

interface Portfolio {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

interface Order {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  orderType: 'BUY' | 'SELL';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  timestamp: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  accessToken?: string;
  isAuthenticated: boolean;
}

interface MarketData {
  indices: Stock[];
  topGainers: Stock[];
  topLosers: Stock[];
}

interface AppState {
  user: User;
  portfolio: Portfolio[];
  orders: Order[];
  watchlist: Stock[];
  marketData: MarketData;
  isLoading: boolean;
  error: string | null;
}

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

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
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
    setMarketData: (state, action: PayloadAction<MarketData>) => {
      state.marketData = action.payload;
    },
  },
});

export const {
  setLoading,
  setUser,
  logout,
  setPortfolio,
  addOrder,
  setWatchlist,
  addToWatchlist,
  setMarketData,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;