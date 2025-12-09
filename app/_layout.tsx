import { useAppColorScheme } from "@/hooks/use-theme";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { useAuth } from "@clerk/clerk-expo";
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
        <ClerkAndConvexProvider>
            <StatusBar style={isLight ? "dark" : "light"} />
            <InitialLayout />
        </ClerkAndConvexProvider>
    );
}
