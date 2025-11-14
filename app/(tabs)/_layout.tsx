import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import "../globals.css";

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (
            <View className="flex w-full flex-1 min-w-[65px] min-h-16 mt-4 justify-center items-center overflow-hidden bg-[#1E3A8A]/10 rounded-xl">
                <Ionicons name={icon} size={20} color={"#1E3A8A"} />
                <Text className="text-sm text-[#1E3A8A] font-semibold">
                    {title}
                </Text>
            </View>
        );
    } else {
        return (
            <View className="flex w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center overflow-hidden">
                <Ionicons name={icon} size={20} color={"#717182"} />
                <Text className="text-sm text-[#717182] font-semibold">
                    {title}
                </Text>
            </View>
        );
    }
};

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#fff",
                    height: 70,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    position: "absolute",
                    overflow: "hidden",
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
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
