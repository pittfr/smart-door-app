import { Text, View } from "react-native";

export default function Settings() {
    return (
        <View className="flex-1 h-full justify-center items-center bg-light-background dark:bg-dark-background">
            <Text className="text-lg text-light-primary dark:text-dark-secondary">
                Settings
            </Text>
        </View>
    );
}
