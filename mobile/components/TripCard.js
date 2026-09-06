import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

export default function TripCard({
  trip,
  onPress,
}) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >

      {/* Top Row */}

      <View style={styles.topRow}>

        <View style={styles.routeContainer}>

          <Text style={styles.car}>
            🚗
          </Text>

          <Text style={styles.route}>
            {trip.startingPoint} → {trip.destination}
          </Text>

        </View>

        {/* Status */}

        <View style={styles.status}>
          <Text style={styles.statusText}>
            Upcoming
          </Text>
        </View>

      </View>


      {/* Trip Name */}

      <Text style={styles.tripName}>
        {trip.name}
      </Text>


      {/* Dates */}

      <View style={styles.dateContainer}>

        <Text style={styles.dateIcon}>
          📅
        </Text>

        <Text style={styles.date}>
          {new Date(trip.startDate).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
            }
          )}

          {" - "}

          {new Date(trip.endDate).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
            }
          )}
        </Text>

      </View>


      {/* Divider */}

      <View style={styles.divider} />


      {/* View Trip */}

      <Text style={styles.viewTrip}>
        View Trip →
      </Text>

    </Pressable>
  );
}


const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  car: {
    fontSize: 22,
    marginRight: 10,
  },

  route: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flexShrink: 1,
  },

  status: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "600",
  },

  tripName: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 14,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  dateIcon: {
    fontSize: 15,
    marginRight: 7,
  },

  date: {
    fontSize: 14,
    color: "#6B7280",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 15,
  },

  viewTrip: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },

});