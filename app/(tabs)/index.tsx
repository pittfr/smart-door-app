import { useAuth } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const { signOut } = useAuth();
    return (
        <View className="flex-1 h-full justify-center items-center bg-light-background dark:bg-dark-background">
            <Text className="text-lg text-light-primary dark:text-dark-secondary">
                Home
            </Text>
            <TouchableOpacity onPress={() => signOut()}>
                <Text className="text-2xl text-light-primary dark:text-dark-secondary">
                    Sign Out
                </Text>
            </TouchableOpacity>
        </View>
    );
}
