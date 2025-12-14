import { Text, View } from "react-native";

export type ErrorBannerProps = {
    message?: string | null;
};

export default function ErrorBanner({ message }: ErrorBannerProps) {
    if (!message) return null;
    return (
        <View className="rounded-md border border-red-300 bg-red-50 dark:bg-red-950/40 px-3 py-2">
            <Text className="text-red-700 dark:text-red-300 text-sm">
                {message}
            </Text>
        </View>
    );
}
