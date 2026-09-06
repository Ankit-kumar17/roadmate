import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useTrips } from "../../context/TripContext";

export default function TripDetails() {

  // URL se id milegi
  const { id } = useLocalSearchParams();

  // Context se trips
  const { trips, deleteTrip } = useTrips();

  // URL wali id ke according trip find karo
  const trip = trips.find(
    (item) => item.id === id
  );

  // Agar trip nahi mili
  if (!trip) {
    return (
      <View style={styles.notFoundContainer}>

        <Text style={styles.notFoundTitle}>
          Trip Not Found
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </Pressable>

      </View>
    );
  }

  // Delete trip
  const handleDelete = () => {

    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {

            await deleteTrip(trip.id);

            router.replace("/(tabs)/trips");
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* Back */}

      <Pressable
        style={styles.back}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </Pressable>


      {/* Header */}

      <View style={styles.header}>

        <Text style={styles.icon}>
          🚗
        </Text>

        <Text style={styles.title}>
          {trip.name}
        </Text>

        <Text style={styles.subtitle}>
          Your trip details
        </Text>

      </View>


      {/* Route Card */}

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          Route
        </Text>

        <View style={styles.routeRow}>

          <View style={styles.locationCircle}>
            <Text>
              📍
            </Text>
          </View>

          <View style={styles.locationInfo}>

            <Text style={styles.locationLabel}>
              Starting Point
            </Text>

            <Text style={styles.location}>
              {trip.startingPoint}
            </Text>

          </View>

        </View>


        <View style={styles.routeLine} />


        <View style={styles.routeRow}>

          <View style={styles.locationCircle}>
            <Text>
              🏁
            </Text>
          </View>

          <View style={styles.locationInfo}>

            <Text style={styles.locationLabel}>
              Destination
            </Text>

            <Text style={styles.location}>
              {trip.destination}
            </Text>

          </View>

        </View>

      </View>


      {/* Date Card */}

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          Trip Dates
        </Text>

        <View style={styles.dateRow}>

          <Text style={styles.dateIcon}>
            📅
          </Text>

          <View>

            <Text style={styles.locationLabel}>
              Start Date
            </Text>

            <Text style={styles.date}>
              {new Date(
                trip.startDate
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>

          </View>

        </View>


        <View style={styles.dateDivider} />


        <View style={styles.dateRow}>

          <Text style={styles.dateIcon}>
            🏁
          </Text>

          <View>

            <Text style={styles.locationLabel}>
              End Date
            </Text>

            <Text style={styles.date}>
              {new Date(
                trip.endDate
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>

          </View>

        </View>

      </View>


      {/* Delete */}

      <Pressable
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteText}>
          Delete Trip
        </Text>
      </Pressable>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  back: {
    marginTop: 20,
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  icon: {
    fontSize: 48,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 5,
    color: "#6B7280",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  locationInfo: {
    marginLeft: 14,
  },

  locationLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 3,
  },

  location: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  routeLine: {
    height: 25,
    width: 2,
    backgroundColor: "#D1D5DB",
    marginLeft: 20,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateIcon: {
    fontSize: 22,
    marginRight: 14,
  },

  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  dateDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  deleteButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  deleteText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "700",
  },

  notFoundContainer: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  notFoundTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

});