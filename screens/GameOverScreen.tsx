import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Title from "@/components/ui/Title";
import Colors from "@/constants/Colors";
import PrimaryButton from "@/components/PrimaryButton";

interface Props {
  roundsNumber: number;
  userNumber: number;
  onStartNewGame?(): void;
}

const GameOverScreen = ({
  roundsNumber,
  userNumber,
  onStartNewGame,
}: Props) => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("@/assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.hightlite}> {roundsNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.hightlite}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary600,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    paddingHorizontal: 15,
    fontFamily: "open-sans",
    fontSize: 22,
  },
  hightlite: {
    fontWeight: "bold",
    color: Colors.primary500,
  },
});

export default GameOverScreen;
