



import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function AppButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,

        pressed && styles.pressed,

        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
        />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,

    backgroundColor: "#2563EB",

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 8,

    paddingHorizontal: 20,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 3,
  },

  pressed: {
    opacity: 0.8,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

//   disabled: {
//     opacity: 0.5,
//   },

//   text: {
//     color: "#FFFFFF",

//     fontSize: 16,

//     fontWeight: "700",

//     letterSpacing: 0.3,
//   },
// });