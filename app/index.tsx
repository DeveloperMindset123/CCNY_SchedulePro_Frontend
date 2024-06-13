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
      {/*  --> having this here will override what has been defined in _layout.tsx
      <Stack.Screen
        //Note : with the update, we no longer need to seperately define the name and the corresponding component, it will pick up on it
        //name="Home"
        options={{ title: "" }}
    /> */}
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
