//ProductAdd.tsx
import React, {useState} from 'react';
import {Button, TextInput, StyleSheet} from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';
import LocalDB from './persistance/localdb'; // Importa el módulo de la base de datos local

export default function ProductAdd(): React.JSX.Element {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [minStock, setMinStock] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [maxStock, setMaxStock] = useState('');

  const handleAddProduct = async () => {
    try {
      const db = await LocalDB.connect(); // Conecta a la base de datos
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO productos (nombre, precio, minStock, currentStock, maxStock) VALUES (?, ?, ?, ?, ?)',
          [nombre, precio, minStock, currentStock, maxStock], // Parámetros de la consulta
          () => {
            console.log('Producto agregado correctamente'); // Mensaje de éxito
            // Limpia los campos del formulario después de agregar el producto
            setNombre('');
            setPrecio('');
            setMinStock('');
            setCurrentStock('');
            setMaxStock('');
          },
          error => console.error('Error al agregar producto:', error), // Manejo de errores
        );
      });
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error); // Manejo de errores de conexión
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del producto"
      />
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        placeholder="Precio"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={minStock}
        onChangeText={setMinStock}
        placeholder="Stock mínimo"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={currentStock}
        onChangeText={setCurrentStock}
        placeholder="Stock actual"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={maxStock}
        onChangeText={setMaxStock}
        placeholder="Stock máximo"
        keyboardType="numeric"
      />
      <Button title="Agregar producto" onPress={handleAddProduct} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
