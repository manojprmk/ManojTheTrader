import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';

const TradingDashboard = () => {
  const showAlert = (message: string) => {
    Alert.alert('Zerodha Trading', message);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#007AFF" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zerodha Trading</Text>
        <Text style={styles.headerSubtitle}>Welcome to your trading dashboard</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.buyButton]}
          onPress={() => showAlert('Buy order functionality')}
        >
          <Text style={styles.actionButtonText}>Quick Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.sellButton]}
          onPress={() => showAlert('Sell order functionality')}
        >
          <Text style={styles.actionButtonText}>Quick Sell</Text>
        </TouchableOpacity>
      </View>

      {/* Market Overview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Market Indices</Text>
        <View style={styles.stockItem}>
          <View style={styles.stockInfo}>
            <Text style={styles.stockSymbol}>NIFTY</Text>
            <Text style={styles.stockName}>NIFTY 50</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>₹19,450.25</Text>
            <Text style={[styles.change, {color: '#00C851'}]}>+125.30 (+0.65%)</Text>
          </View>
        </View>
        <View style={styles.stockItem}>
          <View style={styles.stockInfo}>
            <Text style={styles.stockSymbol}>SENSEX</Text>
            <Text style={styles.stockName}>BSE SENSEX</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>₹65,220.45</Text>
            <Text style={[styles.change, {color: '#00C851'}]}>+234.15 (+0.36%)</Text>
          </View>
        </View>
      </View>

      {/* Top Stocks */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top Gainers</Text>
        <View style={styles.stockItem}>
          <View style={styles.stockInfo}>
            <Text style={styles.stockSymbol}>RELIANCE</Text>
            <Text style={styles.stockName}>Reliance Industries Ltd</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>₹2,456.75</Text>
            <Text style={[styles.change, {color: '#00C851'}]}>+45.30 (+1.88%)</Text>
          </View>
        </View>
        <View style={styles.stockItem}>
          <View style={styles.stockInfo}>
            <Text style={styles.stockSymbol}>HDFCBANK</Text>
            <Text style={styles.stockName}>HDFC Bank Limited</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>₹1,678.45</Text>
            <Text style={[styles.change, {color: '#00C851'}]}>+12.80 (+0.77%)</Text>
          </View>
        </View>
      </View>

      {/* Portfolio Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Portfolio Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Value</Text>
          <Text style={styles.totalValue}>₹1,25,000.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Day's P&L</Text>
          <Text style={[styles.totalPnL, {color: '#00C851'}]}>+₹2,350.75</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Overall P&L</Text>
          <Text style={[styles.totalPnL, {color: '#00C851'}]}>+₹15,420.50</Text>
        </View>
      </View>

      {/* Feature Buttons */}
      <View style={styles.featuresGrid}>
        <TouchableOpacity 
          style={styles.featureButton}
          onPress={() => showAlert('Portfolio feature')}
        >
          <Text style={styles.featureButtonText}>💼 Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.featureButton}
          onPress={() => showAlert('Watchlist feature')}
        >
          <Text style={styles.featureButtonText}>👁️ Watchlist</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.featureButton}
          onPress={() => showAlert('Orders feature')}
        >
          <Text style={styles.featureButtonText}>📊 Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.featureButton}
          onPress={() => showAlert('Profile feature')}
        >
          <Text style={styles.featureButtonText}>👤 Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <TradingDashboard />
      </SafeAreaView>
    </Provider>
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
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
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
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buyButton: {
    backgroundColor: '#00C851',
  },
  sellButton: {
    backgroundColor: '#FF4444',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 15,
  },
  featureButton: {
    backgroundColor: 'white',
    width: '48%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;