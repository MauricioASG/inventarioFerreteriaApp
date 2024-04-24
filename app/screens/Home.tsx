import { RouterProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Button, SafeAreaView, StyleSheet, Text, Touchable, View } from "react-native";
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
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.itemTitle}>{item.nombre}
      </Text>
      </View>  
      <Text style={styles.itemDetails}>Precio: ${item.precio.toFixed(2)}</Text>
    </View>
    <Text
    style={[styles.itemBadge, item.currentStock < item.minStock ? styles.itemBadgeError: null
    ]}>
    {item.currentStock}
    </Text>
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
  itemBadge: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'flex-end',
  },
  itemBadgeError: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  productItem:{
    padding: 12,
    borderBlockColor: '#c0c0c0',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  itemTitle: {
    fontSize: 24,
    color: '#000',
    textTransform: 'uppercase',
  },
  itemDetails:{
    fontSize: 14,
    opacity: 0.7,
    color: '#000',
  }
});
export default Home;
