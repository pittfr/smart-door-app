import { useAppColorScheme } from "@/hooks/use-theme";
import { useAuth } from "@clerk/clerk-expo";
import { Asset } from "expo-asset";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ImageBackground } from "react-native";

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
        <ImageBackground
            source={isLight ? lightBg : darkBg}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "none",
                    contentStyle: { backgroundColor: "transparent" },
                }}
            />
        </ImageBackground>
    );
}
