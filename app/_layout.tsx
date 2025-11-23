import { useAppColorScheme } from "@/hooks/use-theme";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error(
        "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
}

export default function RootLayout() {
    const { isLight } = useAppColorScheme();
    return (
        <ClerkProvider tokenCache={tokenCache}>
            <ClerkLoaded>
                <StatusBar style={isLight ? "dark" : "light"} />
                <Stack screenOptions={{ headerShown: false }} />
            </ClerkLoaded>
        </ClerkProvider>
    );
}
