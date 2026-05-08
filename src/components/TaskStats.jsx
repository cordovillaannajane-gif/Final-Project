import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function TaskStats({ stats }) {
  return (
    <View className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-gray-900">Task Summary</Text>
        <View className="flex-row items-center bg-white/50 px-3 py-1 rounded-full">
          <Ionicons name="analytics-outline" size={16} color="#6366f1" />
          <Text className="ml-1 text-sm font-medium text-indigo-700">
            {stats.total} total
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        <View className="items-center flex-1">
          <Text className="text-2xl font-bold text-gray-900">{stats.pending}</Text>
          <Text className="text-xs text-gray-500 uppercase tracking-wider mt-1">Pending</Text>
        </View>
        
        <View className="w-12 h-1 bg-gray-200 rounded-full mx-3" />
        
        <View className="items-center flex-1">
          <Text className="text-2xl font-bold text-green-600">{stats.completed}</Text>
          <Text className="text-xs text-gray-500 uppercase tracking-wider mt-1">Completed</Text>
        </View>
      </View>
    </View>
  )
}