

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
} from "../../utils/validation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    Keyboard.dismiss();

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      console.log("Login successful");

      router.replace("/(tabs)/home");
    }, 1500);
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
            <Text style={styles.logoText}>R</Text>
          </View>

          <Text style={styles.title}>
            Welcome Back 👋
          </Text>

          <Text style={styles.subtitle}>
            Login to continue your RoadMate journey
          </Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>

          <AppInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            error={emailError}
            keyboardType="email-address"
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={handlePasswordChange}
            error={passwordError}
            secureTextEntry={true}
          />

          {/* Forgot Password */}
          <Pressable
            style={styles.forgotContainer}
            disabled={loading}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </Pressable>

          {/* Login Button */}
          <AppButton
            title="Login"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
          />

          {/* Register */}
          <View style={styles.registerContainer}>
            <Text style={styles.accountText}>
              Don't have an account?
            </Text>

            <Pressable
              onPress={() => router.push("/register")}
              disabled={loading}
            >
              <Text style={styles.registerText}>
                Register
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
    paddingVertical: 35,
  },

  /* Header */

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,

    backgroundColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
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

    marginBottom: 8,

    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",

    lineHeight: 22,

    textAlign: "center",

    paddingHorizontal: 15,
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

  /* Forgot Password */

  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 14,
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },

  /* Register */

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 24,
  },

  accountText: {
    fontSize: 14,
    color: "#6B7280",
  },

  registerText: {
    marginLeft: 5,

    fontSize: 14,
    fontWeight: "700",

    color: "#2563EB",
  },

  /* Footer */

  footer: {
    marginTop: 25,

    textAlign: "center",

    fontSize: 13,

    color: "#9CA3AF",
  },
});