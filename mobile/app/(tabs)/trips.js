import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useTrips } from "../../context/TripContext";

import TripCard from "../../components/TripCard";

import { router } from "expo-router";


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

        {/* No Trips */}

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

          // Trips

          trips.map((trip) => (

            <TripCard
              key={trip.id}
              trip={trip}
              onPress={() => {
                console.log(
                  "Selected Trip:",
                  trip
                );
              }}
            />

          ))

        )}

      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

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

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

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