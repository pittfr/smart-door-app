import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthRoutesLayout() {
    const { isLight } = useAppColorScheme();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS[isLight ? "light" : "dark"].background,
            }}
        >
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "transparent" },
                }}
            />
        </View>
    );
}
