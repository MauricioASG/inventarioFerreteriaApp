import { RouterProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Button, SafeAreaView, StyleSheet, Text, Touchable } from "react-native";
import { Product } from '../../model/Product';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

type RootStackParamList = {
  Home: undefined;
};
type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouterProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({ navigation }: HomeProps): React.JSX.Element {

  const [products, setProducts] = React.useState<Product[]>([]);
const productItem = ({item}: {item: Product}) => (
  <TouchableOpacity style={styles.productItem}>
    <Text style={styles.itemTitle}>{item.nombre}</Text>
  </TouchableOpacity>
  );

  useEffect(() => {
    setProducts([
      {id:1, nombre: 'Martillo', precio: 80, minStock: 5, currentStock: 2, maxStock: 20},
      {id:2, nombre: 'Manguera', precio: 15, minStock: 50, currentStock: 200, maxStock: 1000},
    ])
  }, []);
  return (
    <SafeAreaView>
      <FlatList data={products} renderItem={productItem} keyExtractor={(item) => item.id.toString()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productItem:{
    padding: 12,
  },
  itemTitle: {
    fontSize: 20,
    color: '#000',
  },
  itemDetails:{
    fontSize: 14,
    opacity: 0.7
  }
});
export default Home;
