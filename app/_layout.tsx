import { Stack, Tabs } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Optionally configure static options outside the route.*/}
        <Stack.Screen name="index" options={{}} />
        {/*Define the tabs section*/}
        <Stack.Screen name="(tabs)/explore" options={{}} />
      </Stack>
    </>
  );
}
