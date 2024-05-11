//ProductDetails.tsx
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Button, Platform } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from './model/Product';
import LocalDB from './persistance/localdb';

type Params = {
  product: Product;
};

type Props = {
  route: RouteProp<RootStackParamList, 'ProductDetails'>;
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetails'>;
};

const ProductDetails: React.FC<Props> = ({ route }): React.ReactElement => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProduct(route.params.product);
  }, [route]);

  const handleStockUpdate = async (amount: number) => {
    if (product) {
      const newStock = product.currentStock + amount;
      try {
        const db = await LocalDB.connect();
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE productos SET currentStock = ? WHERE id = ?',
            [newStock, product.id],
            () => {
              console.log('Stock actualizado correctamente');
              setProduct({ ...product, currentStock: newStock });
            },
            error => console.error('Error al actualizar el stock:', error),
          );
        });
      } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
      }
    }
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
          <View style={styles.buttonContainer}>
            <Button title="Entrada" onPress={() => handleStockUpdate(1)} />
            <Button title="Salida" onPress={() => handleStockUpdate(-1)} />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ProductDetails;
