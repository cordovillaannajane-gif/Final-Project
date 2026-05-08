import { useState, useCallback } from 'react'
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import {
  ScrollView,
  Alert,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

type Task = {
  id: string
  text: string
  completed: boolean
}

type Stats = {
  total: number
  completed: number
  pending: number
}

const TaskItem = ({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: () => void
  onDelete: () => void
}) => (
  <View className="px-6 py-4 border-b border-gray-200 bg-white">
    <View className="flex-row items-center justify-between">
      <TouchableOpacity
        onPress={onToggle}
        className="flex-row items-center"
        activeOpacity={0.7}
      >
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={task.completed ? '#10b981' : '#9ca3af'}
        />
        <View className="ml-3">
          <Text className={`text-base ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
            {task.text}
          </Text>
          <Text className="text-xs text-gray-500">
            {task.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} activeOpacity={0.7}>
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
)

const TaskStats = ({ stats }: { stats: Stats }) => (
  <View className="px-6 py-4 bg-white border-b border-gray-200">
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="text-sm text-gray-500">Total Tasks</Text>
        <Text className="text-xl font-semibold text-gray-900">{stats.total}</Text>
      </View>
      <View className="items-end">
        <Text className="text-sm text-green-600">Completed: {stats.completed}</Text>
        <Text className="text-sm text-yellow-600">Pending: {stats.pending}</Text>
      </View>
    </View>
  </View>
)

const EmptyState = () => (
  <View className="flex-1 justify-center items-center px-6">
    <Text className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</Text>
    <Text className="text-sm text-gray-500 text-center">
      Add a task to get started and keep your day on track.
    </Text>
  </View>
)

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputText, setInputText] = useState('')

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

  const addTask = () => {
    if (inputText.trim() === '') {
      Alert.alert('Invalid Task', 'Please enter a task description')
      return
    }

    const newTask = {
      id: generateId(),
      text: inputText.trim(),
      completed: false,
    }

    setTasks(prev => [newTask, ...prev])
    setInputText('')
  }

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }, [])

  const deleteTask = useCallback((id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTasks(prev => prev.filter(task => task.id !== id))
          },
        },
      ]
    )
  }, [])

  const markAllComplete = useCallback(() => {
    if (tasks.length === 0) return

    const hasPending = tasks.some(task => !task.completed)
    if (!hasPending) {
      Alert.alert('All Done!', 'All tasks are already completed 🎉')
      return
    }

    setTasks(prev => prev.map(task => ({ ...task, completed: true })))
  }, [tasks.length])

  const deleteCompleted = useCallback(() => {
    const completedCount = tasks.filter(task => task.completed).length
    if (completedCount === 0) {
      Alert.alert('Nothing to Delete', 'No completed tasks found')
      return
    }

    Alert.alert(
      'Clear Completed',
      `Delete ${completedCount} completed task(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTasks(prev => prev.filter(task => !task.completed))
          },
        },
      ]
    )
  }, [tasks])

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <View className="px-6 pt-4 pb-6 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-1">My Tasks</Text>
        <Text className="text-sm text-gray-500">Stay organized and productive</Text>
      </View>

      <TaskStats stats={stats} />

      <View className="flex-1">
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}