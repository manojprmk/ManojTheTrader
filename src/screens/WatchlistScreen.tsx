import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setWatchlist, addToWatchlist, removeFromWatchlist } from '../store';
import { zerodhaAPI } from '../services/api';

const WatchlistScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state: RootState) => state.app);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      setIsLoading(true);
      const data = await zerodhaAPI.getWatchlist();
      dispatch(setWatchlist(data));
    } catch (error) {
      console.error('Failed to load watchlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchStocks = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await zerodhaAPI.searchStocks(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleAddToWatchlist = (stock: any) => {
    dispatch(addToWatchlist(stock));
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    dispatch(removeFromWatchlist(symbol));
  };

  const StockItem = ({ stock, showAddButton = false, showRemoveButton = false }: any) => (
    <TouchableOpacity
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
      {showAddButton && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToWatchlist(stock)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
      {showRemoveButton && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFromWatchlist(stock.symbol)}
        >
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Watchlist</Text>
      </View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stocks..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchStocks(text);
          }}
        />
      </View>

      {searchResults.length > 0 && (
        <View style={styles.searchResults}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          {searchResults.map((stock, index) => (
            <StockItem key={index} stock={stock} showAddButton={true} />
          ))}
        </View>
      )}

      <ScrollView
        style={styles.watchlistSection}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadWatchlist} />
        }
      >
        <Text style={styles.sectionTitle}>
          My Watchlist ({watchlist.length})
        </Text>
        {watchlist.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No stocks in watchlist</Text>
            <Text style={styles.emptySubtext}>
              Search and add stocks to track them
            </Text>
          </View>
        ) : (
          watchlist.map((stock, index) => (
            <StockItem key={index} stock={stock} showRemoveButton={true} />
          ))
        )}
      </ScrollView>
    </View>
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
  searchSection: {
    padding: 15,
    backgroundColor: 'white',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  searchResults: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
    maxHeight: 200,
  },
  watchlistSection: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  stockItem: {
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
    marginRight: 10,
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
  addButton: {
    backgroundColor: '#00C851',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default WatchlistScreen;