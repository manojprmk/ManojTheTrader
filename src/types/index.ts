export interface Stock {
  symbol: string;
  name: string;
  ltp: number; // Last Traded Price
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

export interface Portfolio {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface Order {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  orderType: 'BUY' | 'SELL';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accessToken?: string;
  isAuthenticated: boolean;
}

export interface MarketData {
  indices: Stock[];
  topGainers: Stock[];
  topLosers: Stock[];
}

export interface AppState {
  user: User;
  portfolio: Portfolio[];
  orders: Order[];
  watchlist: Stock[];
  marketData: MarketData;
  isLoading: boolean;
  error: string | null;
}