/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const ProductEntryAndExit: React.FC<Props> = ({ currentStock, onEntry, onExit }) => {
  // El estado `quantity` guarda la cantidad ingresada.
  const [quantity, setQuantity] = useState('');

  // La función handleEntry se llama cuando se presiona el botón de entrada.
  // Convierte la cantidad ingresada a un número entero y verifica si es válido y mayor que cero.
  // Luego llama a la función onEntry pasando la cantidad ingresada y reinicia la cantidad a vacío.
  const handleEntry = () => {
    const entryQuantity = parseInt(quantity, 10);
    if (!isNaN(entryQuantity) && entryQuantity > 0) {
      onEntry(entryQuantity);
      setQuantity('');
    }
  };

  // La función handleExit se llama cuando se presiona el botón de salida.
  // Convierte la cantidad ingresada a un número entero y verifica si es válido y mayor que cero, 
  //y si es menor o igual al stock actual.
  // Luego llama a la función onExit pasando la cantidad ingresada y reinicia la cantidad a vacío.
  const handleExit = () => {
    const exitQuantity = parseInt(quantity, 10);
    if (!isNaN(exitQuantity) && exitQuantity > 0 && exitQuantity <= currentStock) {
      onExit(exitQuantity);
      setQuantity('');
    }
  };

  // El componente muestra un campo de entrada de texto para ingresar la cantidad y dos botones para entrada y salida.
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Cantidad"
        keyboardType="numeric"
      />
      <Button title="Entrada" onPress={handleEntry} />
      <Button title="Salida" onPress={handleExit} />
    </View>
  );
};

// Estilos para el componente.
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  input: {
    width: 100,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

export default ProductEntryAndExit;
