import { Stack, Tabs } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  //TODO : Define all relevant routes for screens and tabs here, it's good practice to declare them here, can things like how the page UI looks like
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "green",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Optionally configure static options outside the route.*/}
        <Stack.Screen
          name="index"
          //TODO : Remove Later, placed it here as a joke
          options={{ title: "Yass Queen Slay!", headerShown: true }}
        />
        <Stack.Screen name="details" options={{ title: "DetailsTest" }} />
        <Stack.Screen name="home/message" options={{ title: "Messagepage" }} />
        {/*Define the tabs section*/}
        {/**TODO : Look into why this warning is occuring and stating that the route doesn't exist */}
        {/*<Stack.Screen name="./(tabs)/explore" options={{}} /> */}
      </Stack>
    </>
  );
}
