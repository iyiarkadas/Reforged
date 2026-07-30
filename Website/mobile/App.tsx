import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { themes, type ThemeName } from "./src/theme";

type TabName = "dashboard" | "calendar" | "exercises" | "user" | "settings";

const activities = [
  { day: "2", label: "Run", load: 68 },
  { day: "5", label: "PT", load: 45 },
  { day: "9", label: "Lift", load: 72 },
  { day: "14", label: "Mobility", load: 28 },
  { day: "18", label: "Game", load: 91 },
  { day: "23", label: "Bike", load: 52 },
  { day: "27", label: "Recovery", load: 18 },
];

const exercises = [
  { title: "Split Squat ISO", meta: "Strength rebuild", icon: "barbell-outline" },
  { title: "Lateral Decel", meta: "Return-to-cut", icon: "git-branch-outline" },
  { title: "Shoulder CARs", meta: "Mobility reset", icon: "body-outline" },
  { title: "Wall Acceleration", meta: "Sprint mechanics", icon: "flash-outline" },
] as const;

const tabs: { id: TabName; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: "dashboard", label: "Home", icon: "grid-outline" },
  { id: "calendar", label: "Calendar", icon: "calendar-outline" },
  { id: "exercises", label: "Exercises", icon: "videocam-outline" },
  { id: "user", label: "User", icon: "person-outline" },
  { id: "settings", label: "Settings", icon: "settings-outline" },
];

export default function App() {
  const systemTheme = useColorScheme();
  const [themeName, setThemeName] = useState<ThemeName>(systemTheme === "light" ? "light" : "dark");
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>("dashboard");
  const theme = themes[themeName];
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.screen}>
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
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
        <ScrollView contentContainerStyle={styles.loginContent}>
          <View style={styles.loginPanel}>
            <Text style={styles.kicker}>Reforged App</Text>
            <Text style={styles.title}>Athlete Login</Text>
            <Text style={styles.bodyText}>Open your private dashboard for scheduling, programs, exercise media, and profile status.</Text>
            <TextInput placeholder="Email" placeholderTextColor={theme.muted} style={styles.input} />
            <TextInput placeholder="Password" placeholderTextColor={theme.muted} secureTextEntry style={styles.input} />
            <Pressable style={styles.primaryButton} onPress={() => setJoined(true)}>
              <Text style={styles.primaryButtonText}>Login</Text>
              <Ionicons name="arrow-forward" color={theme.primaryText} size={18} />
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            {activeTab === "dashboard" && <Dashboard styles={styles} theme={theme} />}
            {activeTab === "calendar" && <Calendar styles={styles} theme={theme} />}
            {activeTab === "exercises" && <Exercises styles={styles} theme={theme} />}
            {activeTab === "user" && <UserProfile styles={styles} theme={theme} />}
            {activeTab === "settings" && <Settings styles={styles} theme={theme} setJoined={setJoined} />}
          </ScrollView>

          <View style={styles.bottomNav}>
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  accessibilityRole="button"
                  accessibilityLabel={tab.label}
                  onPress={() => setActiveTab(tab.id)}
                  style={[styles.navItem, active && styles.navItemActive]}
                >
                  <Ionicons name={tab.icon} color={active ? theme.primaryText : theme.muted} size={20} />
                  <Text style={[styles.navText, active && styles.navTextActive]}>{tab.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

function Dashboard({ styles, theme }: ScreenProps) {
  return (
    <View style={styles.stack}>
      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Ionicons name="body" color={theme.primary} size={36} />
          <View style={styles.kneeBadge} />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.kicker}>Athlete Dashboard</Text>
          <Text style={styles.title}>Rebuild Phase</Text>
          <Text style={styles.bodyText}>Left knee monitored. Readiness 84%.</Text>
        </View>
      </View>

      <View style={styles.metricRow}>
        <Metric styles={styles} label="Sessions" value="12" />
        <Metric styles={styles} label="Readiness" value="84%" />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Today</Text>
        <Text style={styles.bodyText}>Hamstring sprint exposure, 3 angles of feedback, and post-session soreness check.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Next One-on-One</Text>
        <Text style={styles.bodyText}>Thursday at 4:30 PM with your trainer.</Text>
      </View>
    </View>
  );
}

function Calendar({ styles }: ScreenProps) {
  const [selectedDay, setSelectedDay] = useState("18");
  const selected = activities.find((activity) => activity.day === selectedDay);

  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>Scheduling</Text>
      <Text style={styles.title}>Calendar</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Monthly Activity</Text>
        <View style={styles.activityGrid}>
          {activities.map((activity) => {
            const active = activity.day === selectedDay;
            return (
              <Pressable key={activity.day} onPress={() => setSelectedDay(activity.day)} style={[styles.activityCell, active && styles.activityCellActive]}>
                <Text style={styles.dayText}>{activity.day}</Text>
                <Text style={styles.activityText}>{activity.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{selected ? selected.label : "Open Day"}</Text>
        <Text style={styles.bodyText}>Training load: {selected ? selected.load : 0}%</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${selected ? selected.load : 0}%` }]} />
        </View>
      </View>
    </View>
  );
}

function Exercises({ styles, theme }: ScreenProps) {
  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>Exercise Library</Text>
      <Text style={styles.title}>Assigned Work</Text>
      {exercises.map((exercise) => (
        <View key={exercise.title} style={styles.exerciseRow}>
          <View style={styles.exerciseIcon}>
            <Ionicons name={exercise.icon} color={theme.primary} size={22} />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.rowTitle}>{exercise.title}</Text>
            <Text style={styles.bodyText}>{exercise.meta}</Text>
          </View>
          <Ionicons name="play-circle-outline" color={theme.muted} size={24} />
        </View>
      ))}
    </View>
  );
}

function UserProfile({ styles }: ScreenProps) {
  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>User Info</Text>
      <Text style={styles.title}>Serkan Y.</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        <InfoLine styles={styles} label="Primary Sport" value="Soccer" />
        <InfoLine styles={styles} label="Program" value="Premium Return Program" />
        <InfoLine styles={styles} label="Injury Status" value="Left knee monitored" />
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Injury Map</Text>
        <Text style={styles.bodyText}>Left Knee: post-injury rebuild. Last updated during profile intake.</Text>
      </View>
    </View>
  );
}

function Settings({ styles, theme, setJoined }: ScreenProps & { setJoined: (value: boolean) => void }) {
  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>Preferences</Text>
      <Text style={styles.title}>Settings</Text>
      {["Notifications", "Email verification", "Coach messages", "Privacy"].map((item) => (
        <View key={item} style={styles.settingsRow}>
          <Text style={styles.rowTitle}>{item}</Text>
          <Ionicons name="chevron-forward" color={theme.muted} size={20} />
        </View>
      ))}
      <Pressable style={styles.secondaryButton} onPress={() => setJoined(false)}>
        <Text style={styles.secondaryButtonText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

function Metric({ styles, label, value }: { styles: ReturnType<typeof createStyles>; label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.kicker}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function InfoLine({ styles, label, value }: { styles: ReturnType<typeof createStyles>; label: string; value: string }) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

interface ScreenProps {
  styles: ReturnType<typeof createStyles>;
  theme: (typeof themes)[ThemeName];
}

function createStyles(theme: (typeof themes)[ThemeName]) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    topBar: {
      alignItems: "center",
      backgroundColor: theme.background,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      paddingBottom: 14,
      paddingTop: 58,
    },
    content: {
      padding: 22,
      paddingBottom: 112,
    },
    loginContent: {
      flexGrow: 1,
      justifyContent: "center",
      padding: 24,
    },
    logo: {
      height: 42,
      width: 150,
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
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 2,
      marginBottom: 8,
      textTransform: "uppercase",
    },
    title: {
      color: theme.foreground,
      fontSize: 32,
      fontWeight: "900",
      letterSpacing: 0,
      marginBottom: 12,
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
    secondaryButton: {
      alignItems: "center",
      borderColor: theme.border,
      borderWidth: 1,
      padding: 15,
    },
    secondaryButtonText: {
      color: theme.foreground,
      fontWeight: "800",
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
    stack: {
      gap: 16,
    },
    profileRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: 16,
    },
    profileText: {
      flex: 1,
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
      fontWeight: "900",
      marginBottom: 10,
      textTransform: "uppercase",
    },
    bodyText: {
      color: theme.muted,
      fontSize: 15,
      lineHeight: 22,
    },
    metricRow: {
      flexDirection: "row",
      gap: 12,
    },
    metricCard: {
      backgroundColor: theme.card,
      borderColor: theme.border,
      borderWidth: 1,
      flex: 1,
      padding: 16,
    },
    metricValue: {
      color: theme.foreground,
      fontSize: 32,
      fontWeight: "900",
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
    activityCellActive: {
      borderColor: theme.primary,
      backgroundColor: theme.primarySoft,
    },
    dayText: {
      color: theme.foreground,
      fontWeight: "900",
    },
    activityText: {
      color: theme.primary,
      marginTop: 6,
    },
    progressTrack: {
      backgroundColor: theme.background,
      height: 8,
      marginTop: 12,
    },
    progressFill: {
      backgroundColor: theme.primary,
      height: 8,
    },
    exerciseRow: {
      alignItems: "center",
      backgroundColor: theme.card,
      borderColor: theme.border,
      borderWidth: 1,
      flexDirection: "row",
      gap: 14,
      padding: 16,
    },
    exerciseIcon: {
      alignItems: "center",
      backgroundColor: theme.background,
      borderColor: theme.border,
      borderWidth: 1,
      height: 48,
      justifyContent: "center",
      width: 48,
    },
    rowTitle: {
      color: theme.foreground,
      fontSize: 16,
      fontWeight: "800",
      textTransform: "uppercase",
    },
    infoLine: {
      borderTopColor: theme.border,
      borderTopWidth: 1,
      paddingVertical: 12,
    },
    infoLabel: {
      color: theme.muted,
      fontSize: 12,
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
    infoValue: {
      color: theme.foreground,
      fontSize: 16,
      marginTop: 4,
    },
    settingsRow: {
      alignItems: "center",
      backgroundColor: theme.card,
      borderColor: theme.border,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 18,
    },
    bottomNav: {
      backgroundColor: theme.card,
      borderTopColor: theme.border,
      borderTopWidth: 1,
      bottom: 0,
      flexDirection: "row",
      gap: 6,
      left: 0,
      paddingBottom: 24,
      paddingHorizontal: 10,
      paddingTop: 10,
      position: "absolute",
      right: 0,
    },
    navItem: {
      alignItems: "center",
      flex: 1,
      gap: 4,
      minHeight: 56,
      justifyContent: "center",
    },
    navItemActive: {
      backgroundColor: theme.primary,
    },
    navText: {
      color: theme.muted,
      fontSize: 10,
      fontWeight: "800",
      textTransform: "uppercase",
    },
    navTextActive: {
      color: theme.primaryText,
    },
  });
}
