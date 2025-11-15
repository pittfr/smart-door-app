import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useAppColorScheme } from "../../hooks/use-theme";
import "../globals.css";

const TabIcon = ({ focused, icon, title, isLight }: any) => {
    if (focused) {
        return (
            <View
                className={
                    "flex flex-col w-full flex-1 min-w-[65px] min-h-16 mt-4 justify-center items-center overflow-hidden bg-light-primary/10 dark:bg-dark-secondary/20 rounded-xl transition-all duration-200"
                }
            >
                <Ionicons
                    name={icon}
                    size={20}
                    color={
                        isLight
                            ? COLORS.light.primary.base
                            : COLORS.dark.secondary.base
                    }
                />
                <Text className="text-sm text-light-primary dark:text-dark-secondary font-semibold">
                    {title}
                </Text>
            </View>
        );
    } else {
        return (
            <View className="flex flex-col w-full flex-1 min-w-[65px] min-h-16 mt-4 justify-center items-center overflow-hidden rounded-xl">
                <Ionicons
                    name={icon}
                    size={20}
                    color={COLORS[isLight ? "light" : "dark"].muted.foreground}
                />
                <Text className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground font-semibold">
                    {title}
                </Text>
            </View>
        );
    }
};

export default function TabLayout() {
    const { colorScheme, isLight } = useAppColorScheme();
    return (
        <Tabs
            key={colorScheme}
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor:
                        COLORS[isLight ? "light" : "dark"].card.base,
                    height: 70,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    position: "absolute",
                    overflow: "hidden",
                    borderTopColor: COLORS[isLight ? "light" : "dark"].border,
                    borderTopWidth: 1,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="home-outline"
                            title="Home"
                            isLight={isLight}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="manage"
                options={{
                    title: "Manage",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="people-outline"
                            title="Manage"
                            isLight={isLight}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: "Camera",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="camera-outline"
                            title="Camera"
                            isLight={isLight}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="alerts"
                options={{
                    title: "Alerts",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="notifications-outline"
                            title="Alerts"
                            isLight={isLight}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="settings-outline"
                            title="Settings"
                            isLight={isLight}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
