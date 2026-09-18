import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from "react-native";

import { useState, useEffect, useRef } from "react";
import { router } from "expo-router";

import DateTimePicker from "@react-native-community/datetimepicker";

import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

import { getToken } from "../utils/authStorage";

export default function CreateTrip() {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // -----------------------------
  // Trip form states
  // -----------------------------

  const [tripName, setTripName] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");

  // -----------------------------
  // Date states
  // -----------------------------

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // -----------------------------
  // Date picker visibility
  // -----------------------------

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // -----------------------------
  // Loading state
  // -----------------------------

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Error states
  // -----------------------------

  const [tripNameError, setTripNameError] = useState("");
  const [startingPointError, setStartingPointError] = useState("");
  const [destinationError, setDestinationError] = useState("");
  const [dateError, setDateError] = useState("");

  // -----------------------------
  // Format date
  // -----------------------------

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // -----------------------------
  // Start date handler
  // -----------------------------

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);

    if (selectedDate) {
      setStartDate(selectedDate);

      // Agar end date start date se pehle hai,
      // to end date reset kar denge.

      if (endDate && selectedDate > endDate) {
        setEndDate(null);
      }

      setDateError("");
    }
  };

  // -----------------------------
  // End date handler
  // -----------------------------

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);

    if (selectedDate) {
      setEndDate(selectedDate);
      setDateError("");
    }
  };

  // -----------------------------
  // Create Trip
  // -----------------------------

  const handleCreateTrip = async () => {
    Keyboard.dismiss();

    // Clear old errors
    setTripNameError("");
    setStartingPointError("");
    setDestinationError("");
    setDateError("");

    let hasError = false;

    // Trip name validation
    if (!tripName.trim()) {
      setTripNameError("Please enter trip name");
      hasError = true;
    }

    // Starting point validation
    if (!startingPoint.trim()) {
      setStartingPointError("Please enter starting point");
      hasError = true;
    }

    // Destination validation
    if (!destination.trim()) {
      setDestinationError("Please enter destination");
      hasError = true;
    }

    // Date validation
    if (!startDate || !endDate) {
      setDateError("Please select start and end date");
      hasError = true;
    }

    // Agar validation error hai
    if (hasError) {
      return;
    }

    try {
      setLoading(true);

      // -----------------------------
      // Get JWT token
      // -----------------------------

      const token = await getToken();

      if (!token) {
        Alert.alert(
          "Login Required",
          "Your login session was not found. Please login again."
        );
        return;
      }

      // -----------------------------
      // Send trip to backend
      // -----------------------------

      const response = await fetch(
        "http://10.48.112.110:5000/api/trips",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: tripName.trim(),
            startingPoint: startingPoint.trim(),
            destination: destination.trim(),
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          }),
        }
      );

      const data = await response.json();

      console.log("Create Trip response:", data);

      // -----------------------------
      // Backend error
      // -----------------------------

      if (!response.ok) {
        Alert.alert(
          "Trip Creation Failed",
          data.message || "Something went wrong."
        );

        return;
      }

      // -----------------------------
      // Success
      // -----------------------------

      console.log("Trip created successfully:", data.trip);

      Alert.alert(
        "Trip Created 🎉",
        "Your trip has been created successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/(tabs)/home");
            },
          },
        ]
      );
    } catch (error) {
      console.log("Create Trip error:", error);

      Alert.alert(
        "Connection Error",
        "Unable to connect to the server."
      );
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  // -----------------------------
  // UI
  // -----------------------------

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
        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Create New Trip 🚗
          </Text>

          <Text style={styles.subtitle}>
            Plan your next adventure
          </Text>
        </View>

        {/* -------------------------------- */}
        {/* Form Card */}
        {/* -------------------------------- */}

        <View style={styles.card}>
          {/* Trip Name */}

          <AppInput
            label="Trip Name"
            placeholder="e.g. Manali Road Trip"
            value={tripName}
            onChangeText={(text) => {
              setTripName(text);

              if (tripNameError) {
                setTripNameError("");
              }
            }}
            error={tripNameError}
          />

          {/* Starting Point */}

          <AppInput
            label="Starting Point"
            placeholder="e.g. Delhi"
            value={startingPoint}
            onChangeText={(text) => {
              setStartingPoint(text);

              if (startingPointError) {
                setStartingPointError("");
              }
            }}
            error={startingPointError}
          />

          {/* Destination */}

          <AppInput
            label="Destination"
            placeholder="e.g. Manali"
            value={destination}
            onChangeText={(text) => {
              setDestination(text);

              if (destinationError) {
                setDestinationError("");
              }
            }}
            error={destinationError}
          />

          {/* -------------------------------- */}
          {/* Start Date */}
          {/* -------------------------------- */}

          <Text style={styles.label}>
            Start Date
          </Text>

          <Pressable
            style={[
              styles.dateInput,
              dateError && styles.dateInputError,
            ]}
            onPress={() => {
              setShowStartPicker(true);
            }}
            disabled={loading}
          >
            <Text
              style={
                startDate
                  ? styles.dateText
                  : styles.placeholderText
              }
            >
              {startDate
                ? formatDate(startDate)
                : "Select start date"}
            </Text>

            <Text style={styles.calendar}>
              📅
            </Text>
          </Pressable>

          {/* Start Date Picker */}

          {showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={handleStartDateChange}
            />
          )}

          {/* -------------------------------- */}
          {/* End Date */}
          {/* -------------------------------- */}

          <Text style={styles.label}>
            End Date
          </Text>

          <Pressable
            style={[
              styles.dateInput,
              dateError && styles.dateInputError,
            ]}
            onPress={() => {
              setShowEndPicker(true);
            }}
            disabled={loading}
          >
            <Text
              style={
                endDate
                  ? styles.dateText
                  : styles.placeholderText
              }
            >
              {endDate
                ? formatDate(endDate)
                : "Select end date"}
            </Text>

            <Text style={styles.calendar}>
              📅
            </Text>
          </Pressable>

          {/* End Date Picker */}

          {showEndPicker && (
            <DateTimePicker
              value={
                endDate ||
                startDate ||
                new Date()
              }
              mode="date"
              display="default"
              minimumDate={
                startDate || new Date()
              }
              onChange={handleEndDateChange}
            />
          )}

          {/* Date error */}

          {dateError ? (
            <Text style={styles.dateError}>
              {dateError}
            </Text>
          ) : null}

          {/* -------------------------------- */}
          {/* Create Button */}
          {/* -------------------------------- */}

          <AppButton
            title="Create Trip"
            onPress={handleCreateTrip}
            loading={loading}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({
  // Main screen

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  // Scroll content

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // Header

  header: {
    marginTop: 20,
    marginBottom: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
  },

  // Form card

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,

    // Shadow - iOS
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.08,
    shadowRadius: 12,

    // Shadow - Android
    elevation: 4,
  },

  // Date label

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },

  // Date input

  dateInput: {
    height: 52,

    borderWidth: 1,
    borderColor: "#D1D5DB",

    borderRadius: 10,

    paddingHorizontal: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 18,

    backgroundColor: "#FFFFFF",
  },

  // Date selected text

  dateText: {
    fontSize: 16,
    color: "#111827",
  },

  // Placeholder

  placeholderText: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  // Calendar icon

  calendar: {
    fontSize: 18,
  },

  // Date error border

  dateInputError: {
    borderColor: "#EF4444",
  },

  // Date error text

  dateError: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: -10,
    marginBottom: 8,
  },
});