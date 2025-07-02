import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addOrder } from '../store';
import { zerodhaAPI } from '../services/api';

const PlaceOrderScreen = ({ route, navigation }: any) => {
  const { symbol, orderType = 'BUY', currentPrice = 0 } = route.params || {};
  const [selectedSymbol, setSelectedSymbol] = useState(symbol || '');
  const [selectedOrderType, setSelectedOrderType] = useState(orderType);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(currentPrice ? currentPrice.toString() : '');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    const qty = parseInt(quantity) || 0;
    const prc = parseFloat(price) || 0;
    return qty * prc;
  };

  const handlePlaceOrder = async () => {
    if (!selectedSymbol || !quantity || !price) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const qty = parseInt(quantity);
    const prc = parseFloat(price);

    if (qty <= 0 || prc <= 0) {
      Alert.alert('Error', 'Quantity and price must be greater than 0');
      return;
    }

    try {
      setIsLoading(true);
      const order = await zerodhaAPI.placeOrder(
        selectedSymbol,
        qty,
        prc,
        selectedOrderType as 'BUY' | 'SELL'
      );
      
      dispatch(addOrder(order));
      
      Alert.alert(
        'Order Placed',
        `${selectedOrderType} order for ${qty} shares of ${selectedSymbol} at ₹${prc} has been placed successfully.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Place Order</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Stock Symbol</Text>
          <TextInput
            style={styles.input}
            value={selectedSymbol}
            onChangeText={setSelectedSymbol}
            placeholder="Enter stock symbol"
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.orderTypeSection}>
          <Text style={styles.label}>Order Type</Text>
          <View style={styles.orderTypeButtons}>
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                selectedOrderType === 'BUY' && styles.orderTypeButtonActive,
                selectedOrderType === 'BUY' && styles.buyButton,
              ]}
              onPress={() => setSelectedOrderType('BUY')}
            >
              <Text
                style={[
                  styles.orderTypeButtonText,
                  selectedOrderType === 'BUY' && styles.orderTypeButtonTextActive,
                ]}
              >
                BUY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                selectedOrderType === 'SELL' && styles.orderTypeButtonActive,
                selectedOrderType === 'SELL' && styles.sellButton,
              ]}
              onPress={() => setSelectedOrderType('SELL')}
            >
              <Text
                style={[
                  styles.orderTypeButtonText,
                  selectedOrderType === 'SELL' && styles.orderTypeButtonTextActive,
                ]}
              >
                SELL
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter quantity"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price per share</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Symbol:</Text>
            <Text style={styles.summaryValue}>{selectedSymbol || '-'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Type:</Text>
            <Text
              style={[
                styles.summaryValue,
                { color: selectedOrderType === 'BUY' ? '#00C851' : '#FF4444' },
              ]}
            >
              {selectedOrderType}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Quantity:</Text>
            <Text style={styles.summaryValue}>{quantity || '0'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price:</Text>
            <Text style={styles.summaryValue}>₹{price || '0'}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>₹{calculateTotal().toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            { backgroundColor: selectedOrderType === 'BUY' ? '#00C851' : '#FF4444' },
          ]}
          onPress={handlePlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.placeOrderButtonText}>
              Place {selectedOrderType} Order
            </Text>
          )}
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
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  orderTypeSection: {
    marginBottom: 20,
  },
  orderTypeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  orderTypeButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  orderTypeButtonActive: {
    borderColor: 'transparent',
  },
  buyButton: {
    backgroundColor: '#00C851',
  },
  sellButton: {
    backgroundColor: '#FF4444',
  },
  orderTypeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  orderTypeButtonTextActive: {
    color: 'white',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  placeOrderButton: {
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlaceOrderScreen;