import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToWatchlist } from '../store';
import { zerodhaAPI } from '../services/api';
import { Stock } from '../types';

const StockDetailScreen = ({ route, navigation }: any) => {
  const { symbol } = route.params;
  const [stock, setStock] = useState<Stock | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    loadStockDetails();
  }, [symbol]);

  const loadStockDetails = async () => {
    try {
      setIsLoading(true);
      const stockData = await zerodhaAPI.getQuote(symbol);
      setStock(stockData);
    } catch (error) {
      console.error('Failed to load stock details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWatchlist = () => {
    if (stock) {
      dispatch(addToWatchlist(stock));
    }
  };

  const handleBuy = () => {
    navigation.navigate('PlaceOrder', { symbol, orderType: 'BUY', currentPrice: stock?.ltp });
  };

  const handleSell = () => {
    navigation.navigate('PlaceOrder', { symbol, orderType: 'SELL', currentPrice: stock?.ltp });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading stock details...</Text>
      </View>
    );
  }

  if (!stock) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load stock details</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadStockDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{stock.symbol}</Text>
        <Text style={styles.companyName}>{stock.name}</Text>
      </View>

      <View style={styles.priceCard}>
        <Text style={styles.currentPrice}>₹{stock.ltp.toFixed(2)}</Text>
        <Text
          style={[
            styles.priceChange,
            { color: stock.change >= 0 ? '#00C851' : '#FF4444' },
          ]}
        >
          {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Open</Text>
          <Text style={styles.statValue}>₹{stock.open.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>High</Text>
          <Text style={styles.statValue}>₹{stock.high.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Low</Text>
          <Text style={styles.statValue}>₹{stock.low.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Close</Text>
          <Text style={styles.statValue}>₹{stock.close.toFixed(2)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.statValue}>{stock.volume.toLocaleString()}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>LTP</Text>
          <Text style={styles.statValue}>₹{stock.ltp.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartText}>📈 Stock Chart</Text>
        <Text style={styles.chartSubtext}>Chart visualization would go here</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.watchlistButton} onPress={handleAddToWatchlist}>
          <Text style={styles.watchlistButtonText}>Add to Watchlist</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tradingButtons}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buyButtonText}>BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
          <Text style={styles.sellButtonText}>SELL</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  priceCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  currentPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  priceChange: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statsGrid: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    width: '33.33%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  chartPlaceholder: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chartText: {
    fontSize: 24,
    marginBottom: 10,
  },
  chartSubtext: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    margin: 15,
  },
  watchlistButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  watchlistButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tradingButtons: {
    flexDirection: 'row',
    margin: 15,
    gap: 10,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#00C851',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sellButton: {
    flex: 1,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  sellButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StockDetailScreen;