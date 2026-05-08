import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TaskStats({ stats }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Task Summary</Text>

        <View style={styles.badge}>
          <Ionicons name="analytics-outline" size={16} color="#6366f1" />
          <Text style={styles.badgeText}>{stats.total} total</Text>
        </View>
      </View>

     
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.number}>{stats.pending}</Text>
          <Text style={styles.label}>Pending</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.box}>
          <Text style={[styles.number, { color: "#16a34a" }]}>
            {stats.completed}
          </Text>
          <Text style={styles.label}>Completed</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#eef2ff",
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#4f46e5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    alignItems: "center",
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  label: {
    fontSize: 10,
    color: "#6b7280",
    textTransform: "uppercase",
    marginTop: 4,
  },
  divider: {
    width: 48,
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    marginHorizontal: 12,
    alignSelf: "center",
  },
});