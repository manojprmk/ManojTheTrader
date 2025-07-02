import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMarketData, setLoading } from '../store';
import { zerodhaAPI } from '../services/api';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { marketData, isLoading } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    try {
      dispatch(setLoading(true));
      const data = await zerodhaAPI.getMarketData();
      dispatch(setMarketData(data));
    } catch (error) {
      console.error('Failed to load market data:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const MarketCard = ({ title, data }: { title: string; data: any[] }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {data.slice(0, 3).map((stock, index) => (
        <TouchableOpacity
          key={index}
          style={styles.stockItem}
          onPress={() => navigation.navigate('StockDetail', { symbol: stock.symbol })}
        >
          <View style={styles.stockInfo}>
            <Text style={styles.stockSymbol}>{stock.symbol}</Text>
            <Text style={styles.stockName}>{stock.name}</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>₹{stock.ltp.toFixed(2)}</Text>
            <Text
              style={[
                styles.change,
                { color: stock.change >= 0 ? '#00C851' : '#FF4444' },
              ]}
            >
              {stock.change >= 0 ? '+' : ''}
              {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.viewMoreButton}>
        <Text style={styles.viewMoreText}>View More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadMarketData} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Good Morning!</Text>
        <Text style={styles.headerSubtitle}>Ready to trade today?</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('PlaceOrder')}
        >
          <Text style={styles.actionButtonText}>Quick Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#FF4444' }]}
          onPress={() => navigation.navigate('PlaceOrder')}
        >
          <Text style={styles.actionButtonText}>Quick Sell</Text>
        </TouchableOpacity>
      </View>

      <MarketCard title="Market Indices" data={marketData.indices} />
      <MarketCard title="Top Gainers" data={marketData.topGainers} />
      <MarketCard title="Top Losers" data={marketData.topLosers} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: -20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButton: {
    backgroundColor: '#00C851',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  stockName: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  change: {
    fontSize: 12,
    marginTop: 2,
  },
  viewMoreButton: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  viewMoreText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;