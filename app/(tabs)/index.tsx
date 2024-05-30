import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

/**
 * 
 * @referenceCode 
 * import React from 'react';

import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '48px',
    fontFamily: 'Source Sans Pro',
    fontWeight: 600,
    lineHeight: '54px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'CCNY SchedulePro',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;
 */

const defaultProps = {
  text: "CCNY Schedule Pro",
};

export default function HomeScreen(this: any, props: { text: any }) {
  return (
    <SafeAreaView style={LandingScreenStyle.background}>
      <Image
        source={require("@/assets/images/LandingPageImage.png")}
        style={LandingScreenStyle.ImageContainer}
      />
      <View {...this.props} style={LandingScreenStyle.TitleTextStyling}>
        <Text style={LandingScreenStyle.TitleTextStyling}>
          CCNY Schedule Pro
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Use this as reference for how css should be defined in React Native
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

const LandingScreenStyle = StyleSheet.create({
  ImageContainer: {
    //no units needs to be specified, use number values only, numerical values are automatically assigned px
    top: 119,
    left: 88,
    width: 200,
    height: 200,
    borderRadius: 24,
    backgroundColor: "black",
  },
  background: {
    backgroundColor: "black",
    /*
     *flex : 1 ensures 100% width and height
     */
    flex: 1,
  },
  TitleTextStyling: {
    color: " #ffffff",
    fontSize: 48,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 900,
    lineHeight: 54,
    textAlign: "center",
    marginTop: 100,
    padding: 12,
  },
});
