import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { useAuth } from "@clerk/clerk-expo";
import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function AuthRoutesLayout() {
    const { isSignedIn } = useAuth();
    const { isLight } = useAppColorScheme();

    const lightBg = require("../../assets/images/login-bg-light.png");
    const darkBg = require("../../assets/images/login-bg-dark.png");

    useEffect(() => {
        Asset.loadAsync([lightBg, darkBg]).catch(() => {});
    }, []);

    if (isSignedIn) {
        return <Redirect href={"/"} />;
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS[isLight ? "light" : "dark"].background,
            }}
        >
            <Image
                source={isLight ? lightBg : darkBg}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                cachePolicy="memory-disk"
                responsivePolicy="live"
                priority="high"
                transition={200}
            />
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "none",
                    contentStyle: { backgroundColor: "transparent" },
                }}
            />
        </View>
    );
}
