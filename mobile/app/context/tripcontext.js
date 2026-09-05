import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TripContext = createContext();

const TRIPS_KEY = "roadmate_trips";

export function TripProvider({ children }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // Load trips when app starts
  // --------------------------------

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const storedTrips =
        await AsyncStorage.getItem(TRIPS_KEY);

      if (storedTrips) {
        setTrips(JSON.parse(storedTrips));
      }
    } catch (error) {
      console.log("Error loading trips:", error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Add new trip
  // --------------------------------

  const addTrip = async (trip) => {
    try {
      const updatedTrips = [
        ...trips,
        trip,
      ];

      setTrips(updatedTrips);

      await AsyncStorage.setItem(
        TRIPS_KEY,
        JSON.stringify(updatedTrips)
      );

      console.log("Trip saved successfully");
    } catch (error) {
      console.log("Error saving trip:", error);
    }
  };

  // --------------------------------
  // Delete trip
  // --------------------------------

  const deleteTrip = async (tripId) => {
    try {
      const updatedTrips = trips.filter(
        (trip) => trip.id !== tripId
      );

      setTrips(updatedTrips);

      await AsyncStorage.setItem(
        TRIPS_KEY,
        JSON.stringify(updatedTrips)
      );
    } catch (error) {
      console.log("Error deleting trip:", error);
    }
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        deleteTrip,
        loading,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  return useContext(TripContext);
}