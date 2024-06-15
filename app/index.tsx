import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  //Image --> Use the Image route from the expo-image section instead
} from "react-native";
import { Stack, Link } from "expo-router";
import { Image } from "expo-image";

// Declare the relevant Default Routes and Animations Here
export default function Home() {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <View>
        <View>
          <Image
            style={styles.image}
            // Note that if we want to reference a specific asset from local asset directory, this is what needs to be done
            source={require("../assets/images/Landing-Screen-Image-Updated.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </View>
      </View>
      <Text className="text-black">Home Screen</Text>
      <Link
        className="text-white"
        href={{
          // Note that the pathname specified can be directly pointing to the specific file, representing the screen within app directory
          pathname: "./details",
        }}
      >
        Go To Details
      </Link>
      <Link
        className="text-white"
        href={{
          // Note that the pathname specified can be directly pointing to the specific file, representing the screen within app directory
          pathname: "./home/message",
        }}
      >
        Go To Messages
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    // NOTE : images must have their width and height specified in order to render properly
    top: -150,
    //left: 88,
    width: 270,
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "#0553",
  },
});
