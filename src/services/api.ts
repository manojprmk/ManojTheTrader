import axios from 'axios';
import { Stock, Portfolio, Order, MarketData } from '../types';

// Zerodha API configuration
const API_BASE_URL = 'https://api.kite.trade';

// Mock data for demonstration
const mockStocks: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    ltp: 2456.75,
    change: 45.30,
    changePercent: 1.88,
    volume: 1250000,
    high: 2478.90,
    low: 2445.20,
    open: 2450.00,
    close: 2411.45,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    ltp: 3567.80,
    change: -23.15,
    changePercent: -0.64,
    volume: 890000,
    high: 3598.50,
    low: 3555.30,
    open: 3590.95,
    close: 3590.95,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    ltp: 1678.45,
    change: 12.80,
    changePercent: 0.77,
    volume: 2100000,
    high: 1685.30,
    low: 1665.65,
    open: 1665.65,
    close: 1665.65,
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    ltp: 1543.20,
    change: 8.95,
    changePercent: 0.58,
    volume: 1750000,
    high: 1556.70,
    low: 1534.25,
    open: 1534.25,
    close: 1534.25,
  },
];

const mockPortfolio: Portfolio[] = [
  {
    symbol: 'RELIANCE',
    quantity: 50,
    averagePrice: 2400.00,
    currentPrice: 2456.75,
    pnl: 2837.50,
    pnlPercent: 2.37,
  },
  {
    symbol: 'TCS',
    quantity: 25,
    averagePrice: 3600.00,
    currentPrice: 3567.80,
    pnl: -805.00,
    pnlPercent: -0.89,
  },
];

const mockOrders: Order[] = [
  {
    id: '1',
    symbol: 'HDFCBANK',
    quantity: 10,
    price: 1675.00,
    orderType: 'BUY',
    status: 'COMPLETED',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    symbol: 'INFY',
    quantity: 15,
    price: 1550.00,
    orderType: 'SELL',
    status: 'PENDING',
    timestamp: new Date().toISOString(),
  },
];

class ZerodhaAPI {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  // Authentication
  async login(userId: string, password: string, twoFA: string): Promise<any> {
    // Mock login for demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          access_token: 'mock_access_token_12345',
          user_id: userId,
          user_name: 'Demo User',
          email: 'demo@example.com',
        });
      }, 1000);
    });
  }

  // Get market data
  async getMarketData(): Promise<MarketData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          indices: mockStocks.slice(0, 2),
          topGainers: mockStocks.filter(stock => stock.change > 0),
          topLosers: mockStocks.filter(stock => stock.change < 0),
        });
      }, 500);
    });
  }

  // Get stock quote
  async getQuote(symbol: string): Promise<Stock> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stock = mockStocks.find(s => s.symbol === symbol);
        if (stock) {
          resolve(stock);
        } else {
          reject(new Error('Stock not found'));
        }
      }, 300);
    });
  }

  // Get portfolio
  async getPortfolio(): Promise<Portfolio[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPortfolio);
      }, 500);
    });
  }

  // Get orders
  async getOrders(): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockOrders);
      }, 500);
    });
  }

  // Place order
  async placeOrder(
    symbol: string,
    quantity: number,
    price: number,
    orderType: 'BUY' | 'SELL'
  ): Promise<Order> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9),
          symbol,
          quantity,
          price,
          orderType,
          status: 'PENDING',
          timestamp: new Date().toISOString(),
        };
        resolve(newOrder);
      }, 800);
    });
  }

  // Get watchlist
  async getWatchlist(): Promise<Stock[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockStocks);
      }, 400);
    });
  }

  // Search stocks
  async searchStocks(query: string): Promise<Stock[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockStocks.filter(
          stock =>
            stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
            stock.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  }
}

export const zerodhaAPI = new ZerodhaAPI();