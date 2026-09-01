import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

export default function CreateTrip() {
  const [tripName, setTripName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");

  const handleCreateTrip = () => {
    Keyboard.dismiss();

    console.log({
      tripName,
      startLocation,
      destination,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Create New Trip 🚗
          </Text>

          <Text style={styles.subtitle}>
            Plan your next adventure
          </Text>
        </View>

        {/* Form */}

        <View style={styles.card}>

          <AppInput
            label="Trip Name"
            placeholder="e.g. Manali Road Trip"
            value={tripName}
            onChangeText={setTripName}
          />

          <AppInput
            label="Starting Point"
            placeholder="e.g. Delhi"
            value={startLocation}
            onChangeText={setStartLocation}
          />

          <AppInput
            label="Destination"
            placeholder="e.g. Manali"
            value={destination}
            onChangeText={setDestination}
          />

          <AppButton
            title="Create Trip"
            onPress={handleCreateTrip}
          />

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F7FB",
  },

  content: {
    flexGrow: 1,

    paddingHorizontal: 20,

    paddingVertical: 30,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 28,

    fontWeight: "800",

    color: "#111827",

    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,

    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 22,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.08,

    shadowRadius: 15,

    elevation: 4,
  },
});