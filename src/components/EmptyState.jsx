import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function EmptyState() {
  return (
    <View className="flex-1 justify-center items-center px-8 py-12">
      <View className="w-24 h-24 bg-gray-100 rounded-3xl items-center justify-center mb-6">
        <Ionicons name="clipboard-outline" size={48} color="#d1d5db" />
      </View>
      
      <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
        No tasks yet
      </Text>
      
      <Text className="text-base text-gray-500 text-center mb-8 px-4">
        Add a task above to get started. You'll be more productive in no time!
      </Text>
      
      <TouchableOpacity className="bg-blue-500 rounded-2xl px-8 py-4">
        <Text className="text-white font-semibold text-lg">+ Add First Task</Text>
      </TouchableOpacity>
    </View>
  )
}