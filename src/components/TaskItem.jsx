import React from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <View className="mx-6 mb-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 last:mb-0">
      <View className="flex-row items-center justify-between">
        {/* Task Checkbox & Text */}
        <TouchableOpacity
          className="flex-row items-center flex-1"
          onPress={onToggle}
          activeOpacity={0.7}
        >
          <View className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-4 ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'bg-white border-gray-300'
          }`}>
            {task.completed && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
          
          <Text
            className={`text-lg font-medium flex-1 ${
              task.completed
                ? 'line-through text-gray-500'
                : 'text-gray-900'
            }`}
            numberOfLines={2}
          >
            {task.text}
          </Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={onDelete}
          className="p-2 ml-4"
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={22} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  )
}