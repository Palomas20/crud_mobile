import * as React from "react";
import * as RN from "react-native";
import { database } from "../config/fb";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

export default function Product({ id, emoji, nombre, precio, vendido }) {
  const onEdit = () => {
    const docRef = doc(database, "productos", id);
    updateDoc(docRef, {
      vendido: true,
    });
  };

  const onDelete = () => {
    const docRef = doc(database, "productos", id);
    deleteDoc(docRef);
  };

  return (
    <RN.View style={Styles.productContainer}>
      <RN.View
        Style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <RN.Text style={Styles.emoji}>{emoji}</RN.Text>
        <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
      </RN.View>
      <RN.Text style={Styles.name}>{nombre}</RN.Text>
      <RN.Text style={Styles.precio}>{precio}</RN.Text>
      {vendido ? (
        <RN.TouchableOpacity
          style={(Styles.button, { backgroundColor: "gray" })}
        >
          <RN.Text style={Styles.buttonText}>Comprar</RN.Text>
        </RN.TouchableOpacity>
      ) : (
        <RN.TouchableOpacity onPress={onEdit} style={Styles.button}>
          <RN.Text style={Styles.buttonText}>Comprar</RN.Text>
        </RN.TouchableOpacity>
      )}
    </RN.View>
  );
}

const Styles = RN.StyleSheet.create({
  productContainer: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
  emoji: {
    fontSize: 100,
  },
  nombre: {
    fontSize: 32,
    fontWeight: "bold",
  },
  precio: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
  },
  button: {
    backgroundColor: "#0FA5E9",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
