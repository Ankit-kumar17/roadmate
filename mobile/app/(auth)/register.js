

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Keyboard,
} from "react-native";

import { useState } from "react";
import { router } from "expo-router";

import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/validation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    Keyboard.dismiss();

    const nameValidation =
      validateRequired(name, "Name");

    const emailValidation =
      validateEmail(email);

    const passwordValidation =
      validatePassword(password);

    let confirmValidation = "";

    if (!confirmPassword.trim()) {
      confirmValidation =
        "Confirm password is required";
    } else if (password !== confirmPassword) {
      confirmValidation =
        "Passwords do not match";
    }

    setNameError(nameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmValidation);

    if (
      nameValidation ||
      emailValidation ||
      passwordValidation ||
      confirmValidation
    ) {
      return;
    }

    setLoading(true);

    // Temporary API simulation
    setTimeout(() => {
      setLoading(false);

      console.log("Registration successful");

      router.replace("/login");
    }, 1500);
  };

  const handleNameChange = (text) => {
    setName(text);

    if (nameError) {
      setNameError("");
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);

    if (emailError) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);

    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);

    if (confirmPasswordError) {
      setConfirmPasswordError("");
    }
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
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>

          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>
              R
            </Text>
          </View>

          <Text style={styles.title}>
            Create Account 🚗
          </Text>

          <Text style={styles.subtitle}>
            Create your account and start
            your RoadMate journey
          </Text>

        </View>

        {/* Register Card */}
        <View style={styles.card}>

          {/* Name */}
          <AppInput
            label="Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={handleNameChange}
            error={nameError}
          />

          {/* Email */}
          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            error={emailError}
            keyboardType="email-address"
          />

          {/* Password */}
          <AppInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={handlePasswordChange}
            error={passwordError}
            secureTextEntry={true}
          />

          {/* Confirm Password */}
          <AppInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            error={confirmPasswordError}
            secureTextEntry={true}
          />

          {/* Create Account */}
          <AppButton
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
          />

          {/* Login */}
          <View style={styles.loginContainer}>

            <Text style={styles.accountText}>
              Already have an account?
            </Text>

            <Pressable
              onPress={() => router.push("/login")}
              disabled={loading}
            >
              <Text style={styles.loginText}>
                Login
              </Text>
            </Pressable>

          </View>

        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Your journey starts with RoadMate 🚗
        </Text>

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
    justifyContent: "center",

    paddingHorizontal: 22,
    paddingVertical: 30,
  },

  /* Header */

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  logoCircle: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,
  },

  logoText: {
    color: "#FFFFFF",

    fontSize: 28,
    fontWeight: "800",
  },

  title: {
    fontSize: 30,

    fontWeight: "800",

    color: "#111827",

    textAlign: "center",

    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,

    lineHeight: 22,

    color: "#6B7280",

    textAlign: "center",

    paddingHorizontal: 20,
  },

  /* Card */

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

  /* Login */

  loginContainer: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop: 24,
  },

  accountText: {
    fontSize: 14,

    color: "#6B7280",
  },

  loginText: {
    marginLeft: 5,

    fontSize: 14,

    fontWeight: "700",

    color: "#2563EB",
  },

  /* Footer */

  footer: {
    marginTop: 24,

    textAlign: "center",

    fontSize: 13,

    color: "#9CA3AF",
  },
});