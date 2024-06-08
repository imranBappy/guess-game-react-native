import { StyleSheet, Text, TextStyle } from "react-native";
import Colors from "@/constants/Colors";

type Props = {
  children: string;
  style?: TextStyle;
};

const InstructionText = ({ children, style }: Props) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
