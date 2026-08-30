import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Header from "../../components/Header";

export default function Home() {
  return (
    <View style={styles.container}>

      <Header
        name="Ankit"
        subtitle="Ready for your next adventure?"
      />

      <Text style={styles.heading}>
        Your Journey
      </Text>

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
  },
});