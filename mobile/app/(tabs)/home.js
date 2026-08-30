import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

import { router } from "expo-router";

import Header from "../../components/Header";
import TripCard from "../../components/TripCard";
import AppButton from "../../components/AppButton";

export default function Home() {
  const trips = [
    {
      id: "1",
      title: "Delhi → Manali",
      date: "12 Aug - 18 Aug",
      status: "Completed",
    },

    {
      id: "2",
      title: "Jaipur → Udaipur",
      date: "20 Aug - 23 Aug",
      status: "Upcoming",
    },

    {
      id: "3",
      title: "Mumbai → Goa",
      date: "25 Aug - 30 Aug",
      status: "Upcoming",
    },
  ];

  const handleTripPress = (trip) => {
    console.log("Selected trip:", trip);
  };

  const handleCreateTrip = () => {
    router.push("/create-trip");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}

        ListHeaderComponent={
          <View>
            {/* Header */}
            <Header
              name="Ankit"
              subtitle="Ready for your next adventure?"
            />

            {/* Create Trip Button */}
            <AppButton
              title="+  Create New Trip"
              onPress={handleCreateTrip}
            />

            {/* Location */}
            {/* <View style={styles.locationCard}>
              <View style={styles.locationIcon}>
                <Text style={styles.locationEmoji}>
                  📍
                </Text>
              </View> */}

              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>
                  Current Location
                </Text>

                <Text style={styles.locationName}>
                  New Delhi, India
                </Text>
              </View>

              <Pressable>
                <Text style={styles.changeText}>
                  Change
                </Text>
              </Pressable>
            </View>

            {/* Recent Trips */}
            <View style={styles.sectionHeader}>
              <Text style={styles.heading}>
                Recent Trips
              </Text>

              <Pressable
                onPress={() => router.push("/trips")}
              >
                <Text style={styles.seeAll}>
                  See All
                </Text>
              </Pressable>
            </View>
          </View>
        }

        renderItem={({ item }) => (
          <TripCard
            title={item.title}
            date={item.date}
            status={item.status}
            onPress={() => handleTripPress(item)}
          />
        )}

        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>
              🚗
            </Text>

            <Text style={styles.emptyTitle}>
              No trips yet
            </Text>

            <Text style={styles.emptyText}>
              Create your first trip and
              start your journey.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },

  /* Location */

  locationCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 15,

    marginTop: 20,
    marginBottom: 25,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 2,
  },

  locationIcon: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#EFF6FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  locationEmoji: {
    fontSize: 20,
  },

  locationInfo: {
    flex: 1,
  },

  locationLabel: {
    fontSize: 12,

    color: "#6B7280",

    marginBottom: 3,
  },

  locationName: {
    fontSize: 15,

    fontWeight: "700",

    color: "#111827",
  },

  changeText: {
    fontSize: 13,

    fontWeight: "600",

    color: "#2563EB",
  },

  /* Section */

  sectionHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 15,
  },

  heading: {
    fontSize: 21,

    fontWeight: "800",

    color: "#111827",
  },

  seeAll: {
    fontSize: 14,

    fontWeight: "600",

    color: "#2563EB",
  },

  /* Empty State */

  emptyContainer: {
    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 60,

    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 50,

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