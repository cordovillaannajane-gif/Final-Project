import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useEffect, useState, useRef } from "react";
import EmptyState from "../src/components/EmptyState";
import TaskItem from "../src/components/TaskItem";
import TaskStats from "../src/components/TaskStats";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const inputRef = useRef<TextInput | null>(null);

  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  
  const addTodo = () => {
    if (newTodo.trim() === "") {
      alert("Please Enter a Task!");
      return;
    }

    const newItem: Todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };

    setTodos([...todos, newItem]);
    setNewTodo("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    alert("Task Deleted!");
  };


  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };


  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem("TODOS", JSON.stringify(todos)).catch(console.error);
    }
  }, [todos, isLoaded]);

  useEffect(() => {
    AsyncStorage.getItem("TODOS")
      .then((storedTodos) => {
        if (storedTodos !== null) {
          setTodos(JSON.parse(storedTodos));
        }
      })
      .catch(console.error)
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Ionicons name="create" size={34} color="purple" />
        <Text style={styles.headerTitle}>My Tasks</Text>
      </View>


      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Total: {totalTasks}</Text>
        <Text style={styles.statsText}>Completed: {completedTasks}</Text>
        <Text style={styles.statsText}>Pending: {pendingTasks}</Text>
      </View>

      <View style={{ flex: 1 }}>
        {todos.length === 0 ? (
          <EmptyState onAddPress={() => inputRef.current?.focus()} />
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
 renderItem={({ item }) => (
  <TaskItem
    item={item}
    onToggle={toggleTodo}
    onDelete={deleteTodo}
  />
)}
          />
        )}
      </View>

    
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          ref={inputRef}
          placeholder="Add Task"
          style={styles.textInput}
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Ionicons name="bag-add" size={34} color="pink" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "rgb(193, 176, 231)",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "purple",
  },
  statsContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#870b85",
  },
  todoContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",

  },
  deleteButton: {
    marginLeft: "auto",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});