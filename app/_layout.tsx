import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    const { colorScheme, isLight } = useAppColorScheme();
    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor:
                        COLORS[isLight ? "light" : "dark"].background,
                }}
            >
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
