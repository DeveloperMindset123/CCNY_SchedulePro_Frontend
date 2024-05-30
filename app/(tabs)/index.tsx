import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  Button,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

/**
 * 
 * @referenceCode 
import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '523px',
    left: '164px',
    width: '47px',
    height: '48px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '24px',
    color: '#161616',
    backgroundColor: '#ffffff',
    outline: 'none',
  },
  Icon: {
    color: '#161616',
    fill: '#161616',
    width: '17px',
    height: '17px',
    fontSize: '17px',
  },
};

const IconComponent = () => (
  <svg style={styles.Icon}  viewBox="0 0 448 512">
    <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
    </path>
  </svg>
);

const defaultProps = {
  IconComponent,
};

const IconButton = (props) => {
  return (
    <button style={styles.Button}>
      {
        props.IconComponent 
          ? <props.IconComponent style={styles.Icon} /> 
          : <defaultProps.IconComponent />
      }
    </button>
  );
};

export default IconButton;
 */

const defaultTitleProps = {
  text: "CCNY",
};

const defaultSubheadingProps = {
  text: "Class Schedule Manager",
};

const IconComponent = () => (
  <svg style={LandingScreenStyle.IconStyling} viewBox="0 0 448 512">
    <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
  </svg>
);

const DefaultIconProp = {
  IconComponent,
};
export default function HomeScreen(this: any, props: any, ButtonProp: any) {
  return (
    <SafeAreaView style={LandingScreenStyle.background}>
      <Image
        source={require("@/assets/images/LandingPageImage.png")}
        style={LandingScreenStyle.ImageContainer}
      />
      <View {...this.props}>
        <Text style={LandingScreenStyle.TitleTextStyling}>
          {props.text ?? defaultTitleProps.text}
        </Text>
        <Text style={LandingScreenStyle.SubheadingTextStyling}>
          {props.text ?? defaultSubheadingProps.text}
        </Text>
        <Image
          style={{
            alignContent: "center",
            marginLeft: 20,
          }}
          source={require("@/assets/images/IconArrowRight.png")}
        />

        <Button title="" />
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
    marginTop: -30,
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
    color: "white",
    fontSize: 48,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 700,
    lineHeight: 54,
    textAlign: "center",
    marginTop: 180,
    padding: 12,
  },
  SubheadingTextStyling: {
    color: "white",
    fontSize: 28,
    fontFamily: "Arial, Helvetica, Sans Serif",
    lineHeight: 30,
    textAlign: "center",
  },
  ButtonStyling: {
    // cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 524,
    left: 164,
    width: 47,
    height: 48,
    borderWidth: 0,
    //Set by default (ref : https://stackoverflow.com/questions/38503451/does-it-exist-an-equivalent-of-box-sizing-border-box-in-flexbox-for-react-nativ)
    //boxSizing: 'border-box',
    color: "#161616",
    backgroundColor: "white",
    // outline is something exclusive to web
    //outline : 'none'
  },
  IconStyling: {
    color: "#161616",
    width: 17,
    height: 17,
    fontSize: 17,
  },
});
