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
            className="-inset-y-[150px] w-[270px] h-[270px]"
            // Note that if we want to reference a specific asset from local asset directory, this is what needs to be done
            source={require("../assets/images/Landing-Screen-Image-Updated.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </View>
      </View>
      <Text className="text-white text-5xl">Home Screen</Text>
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

/**
 * css placeholder
 * .text {
  color: #ffffff;
  font-size: 48px;
  font-family: "Source Sans Pro";
  font-weight: 600;
  line-height: 54px;
  text-align: center;
}

 */
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 48,
    //fontFamily :
  },
});
