import TabHeader from "@/components/TabHeader";
import { COLORS } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
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
                <Feather
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
                <Feather
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
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaProvider>
            <View
                style={{
                    flex: 1,
                    backgroundColor:
                        COLORS[isLight ? "light" : "dark"].background,
                }}
            >
                <Tabs
                    key={colorScheme}
                    screenOptions={{
                        headerShown: true,
                        header: ({ route }) => {
                            const perRoute = {
                                index: {
                                    description:
                                        "Monitor and control your locks",
                                    primaryAccent: COLORS.dark.primary.base,
                                    secondaryAccent:
                                        COLORS.dark.primary.base + "cc",
                                    borderColor: COLORS.dark.primary.base,
                                    iconName: "shield",
                                },
                                manage: {
                                    description: "Users, PINs, and logs",
                                    primaryAccent: "#615fff",
                                    secondaryAccent: "#ad46ff",
                                    borderColor: "#615fff",
                                    iconName: "settings",
                                },
                                camera: {
                                    description: "Live feed and intercom",
                                    primaryAccent: "#fb2c36",
                                    secondaryAccent: "#ff6900",
                                    borderColor: "#fb2c36",
                                    iconName: "video",
                                },
                                alerts: {
                                    description: "Security alerts and updates",
                                    primaryAccent: "#f0b100",
                                    secondaryAccent: "#ff6900",
                                    borderColor: "#f0b100",
                                    iconName: "bell",
                                },
                                settings: {
                                    description:
                                        "Configure your smart lock system",
                                    primaryAccent: "#45556c",
                                    secondaryAccent: "#314158",
                                    borderColor: "#62748e",
                                    iconName: "settings",
                                },
                            } as const;
                            const {
                                description,
                                primaryAccent,
                                secondaryAccent,
                                borderColor,
                                iconName,
                            } = perRoute[route.name as keyof typeof perRoute];
                            const titles = {
                                index: "Home",
                                manage: "Manage",
                                camera: "Camera",
                                alerts: "Alerts",
                                settings: "Settings",
                            };
                            return (
                                <TabHeader
                                    title={
                                        titles[
                                            route.name as keyof typeof titles
                                        ]
                                    }
                                    description={description}
                                    primaryAccent={primaryAccent}
                                    secondaryAccent={secondaryAccent}
                                    borderColor={borderColor}
                                    icon={iconName}
                                />
                            );
                        },
                        tabBarShowLabel: false,
                        tabBarItemStyle: {
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        tabBarStyle: {
                            backgroundColor:
                                COLORS[isLight ? "light" : "dark"].card.base,
                            height: Platform.OS === "ios" ? 80 : 70,
                            paddingTop: Platform.OS === "ios" ? 15 : 10,
                            paddingHorizontal: 10,
                            position: "absolute",
                            overflow: "hidden",
                            borderTopColor:
                                COLORS[isLight ? "light" : "dark"].border,
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
                                    icon="home"
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
                                    icon="users"
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
                                    icon="camera"
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
                                    icon="bell"
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
                                    icon="settings"
                                    title="Settings"
                                    isLight={isLight}
                                />
                            ),
                        }}
                    />
                </Tabs>
            </View>
        </SafeAreaProvider>
    );
}
