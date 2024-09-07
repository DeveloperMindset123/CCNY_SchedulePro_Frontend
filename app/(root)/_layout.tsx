import { Stack } from "expo-router";

// ** This is the root layout file
export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
