import { useColorScheme } from "nativewind";

type Scheme = "light" | "dark";

const coerce = (scheme: string | null | undefined, fallback: Scheme): Scheme =>
    scheme === "light" || scheme === "dark" ? scheme : fallback;

export const useAppColorScheme = (fallback: Scheme = "light") => {
    const { colorScheme } = useColorScheme();
    const scheme = coerce(colorScheme, fallback);
    return {
        colorScheme: scheme as Scheme,
        isLight: scheme === "light",
        isDark: scheme === "dark",
    } as const;
};

export const useIsLightTheme = (fallback: Scheme = "light") =>
    useAppColorScheme(fallback).isLight;

export const useIsDarkTheme = (fallback: Scheme = "light") =>
    useAppColorScheme(fallback).isDark;

export const usePickTheme = <T>(
    lightValue: T,
    darkValue: T,
    fallback: Scheme = "light"
): T => {
    const { isLight } = useAppColorScheme(fallback);
    return isLight ? lightValue : darkValue;
};
