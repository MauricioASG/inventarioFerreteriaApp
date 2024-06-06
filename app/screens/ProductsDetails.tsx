//ProductDetails.tsx
/* eslint-disable prettier/prettier */
// ProductDetails.tsx

import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Button, Platform, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from './model/Product';
import LocalDB from './persistance/localdb';

//sirve para indicar que datos vamos a nesesotar
type Params = {
  product: Product;
};

type Props = {
  route: RouteProp<RootStackParamList, 'ProductDetails'>;
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetails'>;
};

const ProductDetails: React.FC<Props> = ({ route }): React.ReactElement => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState('');
  
  useEffect(() => {
    setProduct(route.params.product);
  }, [route]);

  const handleStockUpdate = async (amount: number) => {
    if (product) {
      const newStock = product.currentStock + amount;
      if (amount < 0 && Math.abs(amount) > product.currentStock) {
        // Si la cantidad es negativa (salida de stock) y es mayor que el stock actual, mostrar un mensaje de error
        console.error('No se puede sacar más de lo que hay en stock');
        return;
      }
      try {
        const db = await LocalDB.connect();
        db.transaction(async tx => {
          // Actualizamos el stock del producto
          tx.executeSql(
            'UPDATE productos SET currentStock = ? WHERE id = ?',
            [newStock, product.id],
            async () => {
              console.log('Stock actualizado correctamente');
              setProduct({ ...product, currentStock: newStock });
  
              // Insertamos el movimiento en la tabla "movimientos"
              const now = new Date().toISOString();
              tx.executeSql(
                'INSERT INTO movimientos (id_producto, fecha_hora, cantidad) VALUES (?, ?, ?)',
                [product.id, now, amount],
                () => console.log('Movimiento registrado correctamente'),
                error => console.error('Error al registrar el movimiento:', error),
              );
            },
            error => console.error('Error al actualizar el stock:', error),
          );
        });
      } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
      }
    }
  };

  const handleQuantityChange = (text: string) => {
    setQuantity(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <View style={styles.productContainer}>
          <Text style={styles.productName}>{product.nombre}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Stock:</Text>
            <Text style={styles.value}>{product.currentStock}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Precio:</Text>
            <Text style={styles.value}>{product.precio}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={quantity}
            onChangeText={handleQuantityChange}
          />
          <View style={styles.buttonContainer}>
            <Button title="Entrada" onPress={() => handleStockUpdate(parseInt(quantity))} />
            <Button title="Salida" onPress={() => handleStockUpdate(-parseInt(quantity))} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  productContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 18,
  },
  input: {
    height: 40,
    width: '40%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ProductDetails;
