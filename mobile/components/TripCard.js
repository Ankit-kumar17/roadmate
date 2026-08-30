import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

export default function TripCard({
  title,
  date,
  status,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {/* Top Section */}
      <View style={styles.topRow}>

        <View style={styles.tripInfo}>
          <Text style={styles.tripIcon}>
            🚗
          </Text>

          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.status}>
            {status}
          </Text>
        </View>

      </View>

      {/* Date */}
      <Text style={styles.date}>
        📅 {date}
      </Text>

      {/* Bottom */}
      <View style={styles.bottomRow}>
        <Text style={styles.viewText}>
          View Trip
        </Text>

        <Text style={styles.arrow}>
          →
        </Text>
      </View>

    </Pressable>
  );
}

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#FFFFFF",

//     borderRadius: 16,

//     padding: 16,

//     marginBottom: 14,

//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },

//     shadowOpacity: 0.07,

//     shadowRadius: 8,

//     elevation: 3,
//   },

//   pressed: {
//     opacity: 0.8,

//     transform: [
//       {
//         scale: 0.99,
//       },
//     ],
//   },

//   topRow: {
//     flexDirection: "row",

//     justifyContent: "space-between",

//     alignItems: "center",
//   },

//   tripInfo: {
//     flexDirection: "row",

//     alignItems: "center",

//     flex: 1,

//     marginRight: 10,
//   },

//   tripIcon: {
//     fontSize: 24,

//     marginRight: 10,
//   },

//   title: {
//     flex: 1,

//     fontSize: 17,

//     fontWeight: "700",

//     color: "#111827",
//   },

//   statusContainer: {
//     paddingHorizontal: 10,

//     paddingVertical: 5,

//     borderRadius: 20,

//     backgroundColor: "#DCFCE7",
//   },

//   status: {
//     fontSize: 12,

//     fontWeight: "600",

//     color: "#15803D",
//   },

//   date: {
//     marginTop: 14,

//     fontSize: 14,

//     color: "#6B7280",
//   },

//   bottomRow: {
//     flexDirection: "row",

//     justifyContent: "space-between",

//     alignItems: "center",

//     marginTop: 16,

//     paddingTop: 12,

//     borderTopWidth: 1,

//     borderTopColor: "#F3F4F6",
//   },

//   viewText: {
//     fontSize: 14,

//     fontWeight: "600",

//     color: "#2563EB",
//   },

//   arrow: {
//     fontSize: 20,

//     color: "#2563EB",
//   },
// });