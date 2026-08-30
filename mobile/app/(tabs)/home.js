import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import Header from "../../components/Header";
import TripCard from "../../components/TripCard";

export default function Home() {

  const handleTripPress = () => {
    console.log("Trip clicked");
  };

  return (
    <View style={styles.container}>

      <Header
        name="Ankit"
        subtitle="Ready for your next adventure?"
      />

      <Text style={styles.heading}>
        Recent Trips
      </Text>

      <TripCard
        title="Delhi → Manali"
        date="12 Aug - 18 Aug"
        status="Completed"
        onPress={handleTripPress}
      />

      <TripCard
        title="Jaipur → Udaipur"
        date="20 Aug - 23 Aug"
        status="Upcoming"
        onPress={handleTripPress}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F7FB",

    paddingHorizontal: 20,

    paddingTop: 25,
  },

  heading: {
    fontSize: 22,

    fontWeight: "700",

    color: "#111827",

    marginBottom: 15,
  },
});