import { View, Text } from "react-native";
import { useTrips } from "../../context/TripContext";

export default function Trips() {

  const { trips } = useTrips();

  return (
    <View>
      <Text>My Trips</Text>

      {trips.map((trip) => (
        <View key={trip.id}>
          <Text>{trip.name}</Text>

          <Text>
            {trip.startingPoint} → {trip.destination}
          </Text>
        </View>
      ))}
    </View>
  );
}