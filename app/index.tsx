import { View, Text, StyleSheet } from "react-native";
import { Stack, Link } from "expo-router";

// Declare the relevant Default Routes and Animations Here
export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
      <Link href={{ pathname: "./details" }}>Go To Details</Link>
      <Link href={{ pathname: "./home/message" }}>Go To Messages</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
