import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { themes, type ThemeName } from "./src/theme";

const activities = [
  { day: "2", label: "Run" },
  { day: "5", label: "PT" },
  { day: "9", label: "Lift" },
  { day: "18", label: "Game" },
  { day: "27", label: "Recovery" },
];

export default function App() {
  const systemTheme = useColorScheme();
  const [themeName, setThemeName] = useState<ThemeName>(systemTheme === "light" ? "light" : "dark");
  const [joined, setJoined] = useState(false);
  const theme = themes[themeName];
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <Image source={require("./assets/reforged-logo.png")} style={styles.logo} resizeMode="contain" />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Toggle theme"
            onPress={() => setThemeName((current) => (current === "dark" ? "light" : "dark"))}
            style={styles.iconButton}
          >
            <Ionicons name={themeName === "dark" ? "sunny" : "moon"} color={theme.foreground} size={20} />
          </Pressable>
        </View>

        {!joined ? (
          <View style={styles.loginPanel}>
            <Text style={styles.kicker}>Reforged App</Text>
            <Text style={styles.title}>Athlete Login</Text>
            <TextInput placeholder="Email" placeholderTextColor={theme.muted} style={styles.input} />
            <TextInput placeholder="Password" placeholderTextColor={theme.muted} secureTextEntry style={styles.input} />
            <Pressable style={styles.primaryButton} onPress={() => setJoined(true)}>
              <Text style={styles.primaryButtonText}>Login</Text>
              <Ionicons name="arrow-forward" color={theme.primaryText} size={18} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.dashboard}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Ionicons name="body" color={theme.primary} size={36} />
                <View style={styles.kneeBadge} />
              </View>
              <View>
                <Text style={styles.title}>Dashboard</Text>
                <Text style={styles.bodyText}>Left knee monitored · Rebuild phase</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>April Activity</Text>
              <View style={styles.activityGrid}>
                {activities.map((activity) => (
                  <View key={activity.day} style={styles.activityCell}>
                    <Text style={styles.dayText}>{activity.day}</Text>
                    <Text style={styles.activityText}>{activity.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Next One-on-One</Text>
              <Text style={styles.bodyText}>Thursday at 4:30 PM with your trainer.</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Assigned Program</Text>
              <Text style={styles.bodyText}>ACL return-to-cut progression</Text>
              <Text style={styles.bodyText}>Exercise library includes photos and video.</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function createStyles(theme: (typeof themes)[ThemeName]) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 24,
      paddingTop: 64,
    },
    topBar: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 36,
    },
    logo: {
      height: 44,
      width: 154,
    },
    iconButton: {
      alignItems: "center",
      borderColor: theme.border,
      borderWidth: 1,
      height: 42,
      justifyContent: "center",
      width: 42,
    },
    loginPanel: {
      borderColor: theme.border,
      borderWidth: 1,
      backgroundColor: theme.card,
      padding: 20,
    },
    kicker: {
      color: theme.primary,
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 3,
      marginBottom: 10,
      textTransform: "uppercase",
    },
    title: {
      color: theme.foreground,
      fontSize: 34,
      fontWeight: "800",
      letterSpacing: 0,
      marginBottom: 18,
      textTransform: "uppercase",
    },
    input: {
      borderColor: theme.border,
      borderWidth: 1,
      color: theme.foreground,
      fontSize: 16,
      marginBottom: 14,
      paddingHorizontal: 14,
      paddingVertical: 13,
    },
    primaryButton: {
      alignItems: "center",
      backgroundColor: theme.primary,
      flexDirection: "row",
      gap: 8,
      justifyContent: "center",
      marginTop: 6,
      padding: 15,
    },
    primaryButtonText: {
      color: theme.primaryText,
      fontWeight: "800",
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
    dashboard: {
      gap: 16,
    },
    profileRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: 16,
    },
    avatar: {
      alignItems: "center",
      backgroundColor: theme.card,
      borderColor: theme.border,
      borderRadius: 36,
      borderWidth: 1,
      height: 72,
      justifyContent: "center",
      width: 72,
    },
    kneeBadge: {
      backgroundColor: theme.primary,
      height: 8,
      marginLeft: 20,
      marginTop: -4,
      width: 18,
    },
    card: {
      backgroundColor: theme.card,
      borderColor: theme.border,
      borderWidth: 1,
      padding: 18,
    },
    sectionTitle: {
      color: theme.foreground,
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 10,
      textTransform: "uppercase",
    },
    bodyText: {
      color: theme.muted,
      fontSize: 15,
      lineHeight: 22,
    },
    activityGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    activityCell: {
      borderColor: theme.border,
      borderWidth: 1,
      minWidth: 86,
      padding: 12,
    },
    dayText: {
      color: theme.foreground,
      fontWeight: "800",
    },
    activityText: {
      color: theme.primary,
      marginTop: 6,
    },
  });
}
