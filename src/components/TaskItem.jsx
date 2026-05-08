import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <Checkbox
        value={item.completed}
        onValueChange={() => onToggle(item.id)}
      />

      <Text style={[styles.text, item.completed && styles.completed]}>
        {item.title}
      </Text>

      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Ionicons name="trash" size={22} color="pink" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});