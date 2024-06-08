import NumberContainer from "@/components/game/NumberContainer";
import PrimaryButton from "@/components/PrimaryButton";
import Card from "@/components/ui/Card";
import InstructionText from "@/components/ui/InstructionText";
import Title from "@/components/ui/Title";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "@/components/game/GuessLogItem";

type Props = {
  userNumber: number;
  onGameOver(arg:number): void;
};

const generateRandamBetween = (
  min: number,
  max: number,
  exclude: number
): number => {
  const rndNumber: number = Math.floor(Math.random() * (max - min)) + min;
  if (rndNumber === exclude) return generateRandamBetween(min, max, exclude);
  return rndNumber;
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }: Props) => {
  const initialState = generateRandamBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialState);
  const [guessRounds, setGuessRounds] = useState([initialState]);

  useEffect(() => {
    if (currentGuess === userNumber) {

      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 0;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (dircation: string) => {
    // greater , lower

    if (
      (dircation === "lower" && currentGuess > userNumber) ||
      (dircation === "greater" && currentGuess < userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (dircation === "greater") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess - 1;
    }
    const rndNumber = generateRandamBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(rndNumber);
    setGuessRounds((prevGuessRounds) => [rndNumber, ...prevGuessRounds]);
  };

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>{`Opponent's Guess`}</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <>
          <InstructionText style={styles.instructionText}>
            Higher or lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                <Ionicons name="remove" size={24} color={"white"} />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                <Ionicons name="add" size={24} color={"white"} />
              </PrimaryButton>
            </View>
          </View>
        </>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems:'center'
  },
  instructionText: {
    marginBottom: 12,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
