import * as React from "react";
import * as RN from "react-native";
import EmojiPicker from "rn-emoji-keyboard";
import { database } from "../config/fb";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Add() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState({
    emoji: "😮‍💨",
    nombre: "",
    precio: 0,
    vendido: false,
    createdAt: new Date(),
  });

  const onSend = async () => {
    await addDoc(collection(database, "productos"), newItem);
    navigation.goBack();
  };

  const handlePick = (emojiObject) => {
    setNewItem({
      ...newItem,
      emoji: emojiObject.emoji,
    });
  };

  return (
    <RN.View style={Styles.container}>
      <RN.Text style={Styles.title}>Nuevos productos</RN.Text>
      <RN.Text style={Styles.emoji} onPress={() => setIsOpen(true)}>
        {newItem.emoji}
      </RN.Text>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen}
      />
      <RN.TextInput
        onChangeText={(text) => setNewItem({ ...newItem, nombre: text })}
        placeholder="Nombre del producto"
        style={Styles.inputContainer}
      />
      <RN.TextInput
        onChangeText={(text) => setNewItem({ ...newItem, precio: text })}
        placeholder="Precio $$"
        style={Styles.inputContainer}
        keyboardType="number-pad"
      />
      <RN.Button title="Publish" onPress={onSend} />
    </RN.View>
  );
}

const Styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  inputContainer: {
    width: "90%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  emoji: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
});
