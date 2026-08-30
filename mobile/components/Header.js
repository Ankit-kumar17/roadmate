import { View, Text, StyleSheet } from "react-native";

export default function Header({
  name = "Traveler",
  subtitle = "Ready for your next adventure?",
}) {
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.greeting}>
          Hello, {name} 👋
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>

    </View>
  );
}

 const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 25,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 5,

    fontSize: 14,
    color: "#6B7280",
  },

  avatar: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",

    fontSize: 18,
    fontWeight: "700",
  },
});