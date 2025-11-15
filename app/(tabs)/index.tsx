import { COLORS } from "@/constants/theme";
import { colorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppColorScheme } from "../../hooks/use-theme";
import "../globals.css";

export default function Index() {
    const { colorScheme: scheme, isLight } = useAppColorScheme();

    return (
        <View className="flex-1 h-full justify-center items-center bg-light-background dark:bg-dark-background">
            <Text className="text-blue-500">
                Edit app/index.tsx to edit this screen.
            </Text>

            <TouchableOpacity
                onPress={() => {
                    colorScheme.toggle();
                    console.log(COLORS.light.primary.base);
                }}
            >
                <Text className="text-xl text-light-primary dark:text-dark-secondary">
                    Change scheme
                </Text>
            </TouchableOpacity>
        </View>
    );
}
