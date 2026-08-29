import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import { useState } from "react";

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error = "",
  keyboardType = "default",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={styles.container}>

      {/* Label */}
      <Text style={styles.label}>
        {label}
      </Text>

      {/* Input Box */}
      <View
        style={[
          styles.inputContainer,
          error && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={
            isPassword && !showPassword
          }
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Show / Hide Password */}
        {isPassword && (
          <Pressable
            onPress={() =>
              setShowPassword(!showPassword)
            }
            hitSlop={10}
            style={styles.eyeButton}
          >
            <Text style={styles.eye}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Error */}
      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  // Complete input wrapper
  container: {
    marginBottom: 20,
  },

  // Email / Password text
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1F2937",
  },

  // Actual input box
  inputContainer: {
    height: 54,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F9FAFB",

    borderWidth: 1,
    borderColor: "#D1D5DB",

    borderRadius: 12,

    paddingHorizontal: 15,
  },

  // TextInput itself
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",

    paddingVertical: 0,
  },

  // Show/Hide button
  eyeButton: {
    paddingLeft: 12,
    paddingVertical: 8,
  },

  eye: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },

  // Error input border/background
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },

  // Error message
  error: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: "#EF4444",
  },
});