import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{ title: "Home" }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="manage"
                        options={{ title: "Manage" }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="camera"
                        options={{ title: "Camera" }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="alerts"
                        options={{ title: "Alerts" }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="settings"
                        options={{ title: "Settings" }}
                    ></Stack.Screen>
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
