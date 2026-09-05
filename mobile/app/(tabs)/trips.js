import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useTrips } from "../context/tripcontext";

export default function Trips() {
  const { trips } = useTrips();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          My Trips
        </Text>

        <Text style={styles.subtitle}>
          All your planned journeys
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* No trips */}
        {trips.length === 0 ? (
          <View style={styles.emptyContainer}>

            <Text style={styles.emptyIcon}>
              🚗
            </Text>

            <Text style={styles.emptyTitle}>
              No Trips Yet
            </Text>

            <Text style={styles.emptyText}>
              Create your first trip and start your adventure.
            </Text>

          </View>
        ) : (

          // Trips list
          trips.map((trip) => (

            <View
              key={trip.id}
              style={styles.card}
            >

              <View style={styles.cardTop}>

                <View style={styles.routeContainer}>

                  <Text style={styles.car}>
                    🚗
                  </Text>

                  <Text style={styles.route}>
                    {trip.startingPoint} → {trip.destination}
                  </Text>

                </View>

                <View style={styles.status}>
                  <Text style={styles.statusText}>
                    Upcoming
                  </Text>
                </View>

              </View>

              <Text style={styles.tripName}>
                {trip.name}
              </Text>

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

              <View style={styles.divider} />

              <Text style={styles.viewTrip}>
                View Trip →
              </Text>

            </View>

          ))
        )}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  // Main screen
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 5,
  },

  // Scroll area
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Trip card
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

  // Top row
  cardTop: {
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

  // Status
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

  // Trip name
  tripName: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 14,
  },

  // Date
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

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 15,
  },

  // View trip
  viewTrip: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },

  // Empty state
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 40,
    alignItems: "center",
    marginTop: 10,
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 21,
  },

});