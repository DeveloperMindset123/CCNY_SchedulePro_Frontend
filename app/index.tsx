import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  //Image --> Use the Image route from the expo-image section instead
} from "react-native";
import { Stack, Link } from "expo-router";
import { Image } from "expo-image";
import Svg, { Path } from "react-native-svg";

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
      <Text className="flex text-white font-semibold text-5xl items-center justify-center -mt-5 -translate-y-14">
        CCNY
      </Text>
      <Text className="flex items-center justify-center text-white text-2xl leading-8 -translate-y-10">
        Class Schedule Manager
      </Text>

      <View className="items-center justify-center bg-white rounded-full mb-5 py-2 px-2">
        {/**
         * TODO : convert to formal JSDOC for improved readabillity
         * Include SVG asset here, note that this is how svg assets ought to be inclided, simply download and specify the styling and path, replace path with Path and svg with Svg, both of which can be imported from react-native svg */}
        <Link
          //className="text-white"
          href={{
            // Note that the pathname specified can be directly pointing to the specific file, representing the screen within app directory
            pathname: "./details",
          }}
        >
          <Svg
            //xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 overflow-hidden fill-black translate-y-0.5"
            viewBox="0 0 448 512"
          >
            <Path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></Path>
          </Svg>
        </Link>
      </View>
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

 */
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 48,
    //fontFamily :
  },
});
