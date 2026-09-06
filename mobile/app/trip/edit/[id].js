import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

import { useState } from "react";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { useTrips } from "../../../context/TripContext";

import AppInput from "../../../components/AppInput";

import AppButton from "../../../components/AppButton";

export default function EditTrip() {

  const { id } = useLocalSearchParams();

  const {
    trips,
    updateTrip,
  } = useTrips();

  const trip = trips.find(
    (item) => item.id === id
  );


  // -----------------------------
  // Form states
  // -----------------------------

  const [name, setName] = useState(
    trip?.name || ""
  );

  const [startingPoint, setStartingPoint] =
    useState(
      trip?.startingPoint || ""
    );

  const [destination, setDestination] =
    useState(
      trip?.destination || ""
    );


  const [error, setError] = useState("");


  // -----------------------------
  // Update Trip
  // -----------------------------

  const handleUpdate = async () => {

    if (
      !name.trim() ||
      !startingPoint.trim() ||
      !destination.trim()
    ) {

      setError(
        "Please fill all fields"
      );

      return;
    }


    setError("");


    const updatedTrip = {
      ...trip,

      name: name.trim(),

      startingPoint:
        startingPoint.trim(),

      destination:
        destination.trim(),
    };


    await updateTrip(
      updatedTrip
    );


    router.replace(
      `/trip/${trip.id}`
    );
  };


  // -----------------------------
  // Trip not found
  // -----------------------------

  if (!trip) {

    return (
      <View
        style={styles.notFound}
      >

        <Text
          style={styles.notFoundTitle}
        >
          Trip Not Found
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() =>
            router.back()
          }
        >

          <Text
            style={styles.backButtonText}
          >
            Go Back
          </Text>

        </Pressable>

      </View>
    );
  }


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      keyboardShouldPersistTaps="handled"
    >

      {/* Back */}

      <Pressable
        onPress={() =>
          router.back()
        }
        style={styles.back}
      >

        <Text style={styles.backText}>
          ← Back
        </Text>

      </Pressable>


      {/* Header */}

      <Text style={styles.title}>
        Edit Trip
      </Text>

      <Text style={styles.subtitle}>
        Update your trip details
      </Text>


      {/* Form */}

      <View style={styles.form}>

        <AppInput
          label="Trip Name"
          placeholder="Enter trip name"
          value={name}
          onChangeText={setName}
        />


        <AppInput
          label="Starting Point"
          placeholder="Enter starting point"
          value={startingPoint}
          onChangeText={
            setStartingPoint
          }
        />


        <AppInput
          label="Destination"
          placeholder="Enter destination"
          value={destination}
          onChangeText={
            setDestination
          }
        />


        {/* Error */}

        {error ? (

          <Text style={styles.error}>
            {error}
          </Text>

        ) : null}


        {/* Update */}

        <AppButton
          title="Update Trip"
          onPress={handleUpdate}
        />

      </View>

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
    marginBottom: 25,
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
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
    marginBottom: 30,
  },

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
  },

  error: {
    color: "#DC2626",
    fontSize: 13,
    marginBottom: 10,
  },

  notFound: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    justifyContent: "center",
    alignItems: "center",
  },

  notFoundTitle: {
    fontSize: 24,
    fontWeight: "700",
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