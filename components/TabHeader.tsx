import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { ComponentProps } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabHeaderProps = {
    title: string;
    description: string;
    primaryAccent: string;
    secondaryAccent: string;
    borderColor: string;
    icon: ComponentProps<typeof Feather>["name"];
};

export default function TabHeader({
    title,
    description,
    primaryAccent,
    secondaryAccent,
    borderColor,
    icon,
}: TabHeaderProps) {
    const insets = useSafeAreaInsets();

    const { colorScheme, isLight } = useAppColorScheme();

    return (
        <View
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 12,
                elevation: 20,
                overflow: "visible",
                backgroundColor: COLORS[isLight ? "light" : "dark"].background,
            }}
        >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                colors={[
                    "rgba(98,116,142,0.14)",
                    isLight
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(30, 41, 59, 0.3)",
                    isLight
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(30, 41, 59, 0.3)",
                ]}
                style={{
                    paddingTop: insets.top,
                    borderBottomWidth: 2,
                    borderBottomColor: borderColor + "33",
                }}
            >
                <View className="m-5 mb-4 mt-3 flex flex-row items-center justify-between">
                    {/* PAGE TITLE & DESCRIPTION */}
                    <View className="flex flex-col">
                        <Text className="text-2xl font-semibold text-light-foreground dark:text-dark-foreground mb-1">
                            {title}
                        </Text>
                        <Text className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground">
                            {description}
                        </Text>
                    </View>
                    {/* ICON */}
                    <View
                        style={{
                            width: 48,
                            height: 48,
                        }}
                        className="rounded-2xl overflow-hidden"
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={[primaryAccent, secondaryAccent]}
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Feather name={icon} size={24} color={"#fff"} />
                        </LinearGradient>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
