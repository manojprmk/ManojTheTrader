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
import { setOrders, setLoading } from '../store';
import { zerodhaAPI } from '../services/api';

const OrdersScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      dispatch(setLoading(true));
      const data = await zerodhaAPI.getOrders();
      dispatch(setOrders(data));
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return '#00C851';
      case 'PENDING':
        return '#FF8800';
      case 'CANCELLED':
        return '#FF4444';
      default:
        return '#666';
    }
  };

  const OrderItem = ({ order }: { order: any }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <Text style={styles.symbol}>{order.symbol}</Text>
        <Text
          style={[
            styles.status,
            { color: getStatusColor(order.status) },
          ]}
        >
          {order.status}
        </Text>
      </View>
      
      <View style={styles.orderDetails}>
        <View style={styles.orderRow}>
          <Text style={styles.label}>Type:</Text>
          <Text
            style={[
              styles.orderType,
              { color: order.orderType === 'BUY' ? '#00C851' : '#FF4444' },
            ]}
          >
            {order.orderType}
          </Text>
        </View>
        
        <View style={styles.orderRow}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{order.quantity}</Text>
        </View>
        
        <View style={styles.orderRow}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>₹{order.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.orderRow}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>
            ₹{(order.quantity * order.price).toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.orderRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.time}>{formatDate(order.timestamp)}</Text>
        </View>
      </View>
    </View>
  );

  const pendingOrders = orders.filter(order => order.status === 'PENDING');
  const completedOrders = orders.filter(order => order.status === 'COMPLETED');
  const cancelledOrders = orders.filter(order => order.status === 'CANCELLED');

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadOrders} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity
          style={styles.newOrderButton}
          onPress={() => navigation.navigate('PlaceOrder')}
        >
          <Text style={styles.newOrderButtonText}>+ New Order</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{pendingOrders.length}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{completedOrders.length}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{cancelledOrders.length}</Text>
          <Text style={styles.summaryLabel}>Cancelled</Text>
        </View>
      </View>

      {pendingOrders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Orders</Text>
          {pendingOrders.map((order, index) => (
            <OrderItem key={index} order={order} />
          ))}
        </View>
      )}

      {completedOrders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed Orders</Text>
          {completedOrders.map((order, index) => (
            <OrderItem key={index} order={order} />
          ))}
        </View>
      )}

      {orders.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No orders found</Text>
          <TouchableOpacity
            style={styles.startTradingButton}
            onPress={() => navigation.navigate('PlaceOrder')}
          >
            <Text style={styles.startTradingButtonText}>Place First Order</Text>
          </TouchableOpacity>
        </View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  newOrderButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  newOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: -20,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  orderItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderDetails: {
    gap: 5,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  orderType: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  startTradingButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  startTradingButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrdersScreen;