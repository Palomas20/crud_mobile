import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import * as RN from "react-native";
import { database } from "../config/fb";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Product from "../components/Product";

export default function Home() {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RN.Button title="Add" onPress={() => navigation.navigate("Add")} />
      ),
    });
  }, []);

  React.useEffect(() => {
    const collectionRef = collection(database, "productos");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsuscribe = onSnapshot(q, (QuerySnapshot) => {
      setProducts(
        QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          emoji: doc.data().emoji,
          nombre: doc.data().nombre,
          precio: doc.data().precio,
          vendido: doc.data().vendido,
          createdAt: doc.data().createdAt,
        }))
      );
    });
    return unsuscribe;
  }, []);

  return (
    <RN.View style={Styles.container}>
      <RN.Text style={Styles.title}>Productos</RN.Text>
      {products.map((producto) => (
        <Product key={producto.id} {...producto} />
      ))}
    </RN.View>
  );
}

const Styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3F9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 16,
  },
});
