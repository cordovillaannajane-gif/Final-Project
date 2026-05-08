import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmptyState({ onAddPress }) {
  return (
   <View className="flex-1 items-center justify-center px-8">
  <View className="w-24 h-24 bg-gray-100 rounded-3xl items-center justify-center mb-6">
  <Ionicons
  name="clipboard-outline"
  size={164}
  color="#d1d5db" margintop={16}
  style={{ alignSelf: "center" }}
  
/>
  </View>

  <Text className="text-2xl font-bold text-center mb-2">
    No tasks yet
  </Text>

  <Text className="text-gray-500 text-center">
    Add a task to get started and stay productive
  </Text>
</View>
  );
}