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
import { setPortfolio, setLoading } from '../store';
import { zerodhaAPI } from '../services/api';

const PortfolioScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { portfolio, isLoading } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      dispatch(setLoading(true));
      const data = await zerodhaAPI.getPortfolio();
      dispatch(setPortfolio(data));
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const calculateTotalValue = () => {
    return portfolio.reduce((total, holding) => {
      return total + (holding.currentPrice * holding.quantity);
    }, 0);
  };

  const calculateTotalPnL = () => {
    return portfolio.reduce((total, holding) => total + holding.pnl, 0);
  };

  const PortfolioItem = ({ holding }: { holding: any }) => (
    <TouchableOpacity
      style={styles.holdingItem}
      onPress={() => navigation.navigate('StockDetail', { symbol: holding.symbol })}
    >
      <View style={styles.holdingInfo}>
        <Text style={styles.symbol}>{holding.symbol}</Text>
        <Text style={styles.quantity}>{holding.quantity} shares</Text>
        <Text style={styles.avgPrice}>Avg: ₹{holding.averagePrice.toFixed(2)}</Text>
      </View>
      <View style={styles.valueInfo}>
        <Text style={styles.currentPrice}>₹{holding.currentPrice.toFixed(2)}</Text>
        <Text
          style={[
            styles.pnl,
            { color: holding.pnl >= 0 ? '#00C851' : '#FF4444' },
          ]}
        >
          {holding.pnl >= 0 ? '+' : ''}₹{holding.pnl.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.pnlPercent,
            { color: holding.pnlPercent >= 0 ? '#00C851' : '#FF4444' },
          ]}
        >
          ({holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%)
        </Text>
      </View>
    </TouchableOpacity>
  );

  const totalValue = calculateTotalValue();
  const totalPnL = calculateTotalPnL();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadPortfolio} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Portfolio</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Value</Text>
          <Text style={styles.totalValue}>₹{totalValue.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total P&L</Text>
          <Text
            style={[
              styles.totalPnL,
              { color: totalPnL >= 0 ? '#00C851' : '#FF4444' },
            ]}
          >
            {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.holdingsSection}>
        <Text style={styles.sectionTitle}>Holdings ({portfolio.length})</Text>
        {portfolio.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No holdings found</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('PlaceOrder')}
            >
              <Text style={styles.addButtonText}>Start Trading</Text>
            </TouchableOpacity>
          </View>
        ) : (
          portfolio.map((holding, index) => (
            <PortfolioItem key={index} holding={holding} />
          ))
        )}
      </View>
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
  summaryCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPnL: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  holdingsSection: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  holdingItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  holdingInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  avgPrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  valueInfo: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  pnl: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
  },
  pnlPercent: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PortfolioScreen;