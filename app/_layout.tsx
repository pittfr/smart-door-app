import { useAppColorScheme } from "@/hooks/use-theme";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error(
        "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
}

function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;

        const inTabsGroup = segments[0] === "(tabs)";

        if (isSignedIn && !inTabsGroup) {
            router.replace("/(tabs)");
        } else if (!isSignedIn && inTabsGroup) {
            router.replace("/(auth)");
        }
    }, [isSignedIn, isLoaded]);
    return <Slot screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
    const { isLight } = useAppColorScheme();

    return (
        <ClerkProvider tokenCache={tokenCache}>
            <ClerkLoaded>
                <StatusBar style={isLight ? "dark" : "light"} />
                <InitialLayout />
            </ClerkLoaded>
        </ClerkProvider>
    );
}
