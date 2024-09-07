import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView className="flex-1 justify-center align-middle h-full">
      <Text>Tab [Home|schedule|messages|profile|]</Text>
    </SafeAreaView>
  );
}
