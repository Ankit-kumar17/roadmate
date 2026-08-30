import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import Header from "../../components/Header";
import TripCard from "../../components/TripCard";

export default function Home() {

  const trips = [
    // {
    //   id: "1",
    //   title: "Delhi → Manali",
    //   date: "12 Aug - 18 Aug",
    //   status: "Completed",
    // },

    // {
    //   id: "2",
    //   title: "Jaipur → Udaipur",
    //   date: "20 Aug - 23 Aug",
    //   status: "Upcoming",
    // },

    // {
    //   id: "3",
    //   title: "Mumbai → Goa",
    //   date: "25 Aug - 30 Aug",
    //   status: "Upcoming",
    // },
  ];

  const handleTripPress = (trip) => {
    console.log("Selected trip:", trip);
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={trips}

        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <TripCard
            title={item.title}
            date={item.date}
            status={item.status}
            onPress={() => handleTripPress(item)}
          />
        )}

        ListHeaderComponent={
          <View>
            <Header
              name="Ankit"
              subtitle="Ready for your next adventure?"
            />

            <Text style={styles.heading}>
              Recent Trips
            </Text>
          </View>
        }

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

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.listContent}
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

    flexGrow: 1,
  },

  heading: {
    fontSize: 22,

    fontWeight: "700",

    color: "#111827",

    marginBottom: 15,
  },

  emptyContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

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