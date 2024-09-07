// ** This is the tabs layout file
import { Tabs } from "expo-router";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable } from "react-native";
// TODO : Implement logic for when navbar should be displayed, important to note that we are using expo-router, which is different from react-navigation

export default function TabLayout() {
  // define the icon color using ternary operator
  // TODO : Implement functionalities for light and dark mode here
  //const iconColor =
  return (
    <Tabs
      screenOptions={{
        // TODO : Should contrast with a dark background and white icons
        tabBarActiveTintColor: "black",
      }}
    >
      {/**Declaration of tabs are similar to screens, and will persist throughout the app */}
      {/**Icon 1 */}
      <Tabs.Screen
        // treat home page as the root page
        // this should reference the (index) directory content
        name="(index)"
        options={{
          // text to be displayed underneath the tab
          title: "Home",
          // TODO : Impelement routing logic if needed
          //href: "/details",
          // color will be inherited based on the parameter value as specified here
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color="black" />
          ),
          // TODO : Takes in a function to display some form of icon on the right of the header
          // ? implement the profile icon here
          // ** should have a modal view popup here
          //headerRight :
          // TODO : Takes in a function to display some form of icon to the right of the header
          // allow for expanded navbar view here
          // headerLeft :
        }}
      />
      {/**Icon 2 */}
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          // color is automatically inferred as a string in this single line function
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color="black" />
          ),
        }}
      />
      {/**Need to have a large plus icon in the middle */}
      {/**Icon 3, should be taking up larger part of the screen, and bigger that the rest */}
      <Tabs.Screen
        // ! Should have multiple options to choose from on-press and navigated to the appropriate screen as needed, meaning the functionalities in this case will be multiple rather than singular like the other tabs
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <Ionicons
              className="h-80 w-80 rounded-full bg-transparent pt-8"
              name="add"
              size={45}
              color="black"
            />
          ),
        }}
      />
      {/**icon 4 */}
      <Tabs.Screen
        name="messages"
        options={{
          title: "messages",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="message" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
