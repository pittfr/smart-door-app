import { COLORS } from "./constants/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
        "./App.tsx",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                light: {
                    background: COLORS.light.background,
                    foreground: COLORS.light.foreground,
                    card: {
                        DEFAULT: COLORS.light.card.base,
                        foreground: COLORS.light.card.foreground,
                    },
                    popover: {
                        DEFAULT: COLORS.light.popover.base,
                        foreground: COLORS.light.popover.foreground,
                    },
                    primary: {
                        DEFAULT: COLORS.light.primary.base,
                        dark: COLORS.light.primary.dark,
                        light: COLORS.light.primary.light,
                        foreground: COLORS.light.primary.foreground,
                    },
                    secondary: {
                        DEFAULT: COLORS.light.secondary.base,
                        dark: COLORS.light.secondary.dark,
                        light: COLORS.light.secondary.light,
                        foreground: COLORS.light.secondary.foreground,
                    },
                    muted: {
                        DEFAULT: COLORS.light.muted.base,
                        foreground: COLORS.light.muted.foreground,
                    },
                    accent: {
                        DEFAULT: COLORS.light.accent.base,
                        foreground: COLORS.light.accent.foreground,
                    },
                    destructive: {
                        DEFAULT: COLORS.light.destructive.base,
                        foreground: COLORS.light.destructive.foreground,
                    },
                    success: {
                        DEFAULT: COLORS.light.success.base,
                        foreground: COLORS.light.success.foreground,
                    },
                    border: COLORS.light.border,
                    input: {
                        DEFAULT: COLORS.light.input.base,
                        background: COLORS.light.input.background,
                    },
                    switch: COLORS.light.switch,
                    ring: COLORS.light.ring,
                    chart: {
                        1: COLORS.light.chart[1],
                        2: COLORS.light.chart[2],
                        3: COLORS.light.chart[3],
                        4: COLORS.light.chart[4],
                        5: COLORS.light.chart[5],
                    },
                    sidebar: {
                        DEFAULT: COLORS.light.sidebar.base,
                        foreground: COLORS.light.sidebar.foreground,
                        primary: {
                            DEFAULT: COLORS.light.sidebar.primary.base,
                            foreground: COLORS.light.sidebar.primary.foreground,
                        },
                        accent: {
                            DEFAULT: COLORS.light.sidebar.accent.base,
                            foreground: COLORS.light.sidebar.accent.foreground,
                        },
                        border: COLORS.light.sidebar.border,
                        ring: COLORS.light.sidebar.ring,
                    },
                },
                dark: {
                    background: COLORS.dark.background,
                    foreground: COLORS.dark.foreground,
                    card: {
                        DEFAULT: COLORS.dark.card.base,
                        foreground: COLORS.dark.card.foreground,
                    },
                    popover: {
                        DEFAULT: COLORS.dark.popover.base,
                        foreground: COLORS.dark.popover.foreground,
                    },
                    primary: {
                        DEFAULT: COLORS.dark.primary.base,
                        dark: COLORS.dark.primary.dark,
                        light: COLORS.dark.primary.light,
                        foreground: COLORS.dark.primary.foreground,
                    },
                    secondary: {
                        DEFAULT: COLORS.dark.secondary.base,
                        dark: COLORS.dark.secondary.dark,
                        light: COLORS.dark.secondary.light,
                        foreground: COLORS.dark.secondary.foreground,
                    },
                    muted: {
                        DEFAULT: COLORS.dark.muted.base,
                        foreground: COLORS.dark.muted.foreground,
                    },
                    accent: {
                        DEFAULT: COLORS.dark.accent.base,
                        foreground: COLORS.dark.accent.foreground,
                    },
                    destructive: {
                        DEFAULT: COLORS.dark.destructive.base,
                        foreground: COLORS.dark.destructive.foreground,
                    },
                    success: {
                        DEFAULT: COLORS.dark.success.base,
                        foreground: COLORS.dark.success.foreground,
                    },
                    border: COLORS.dark.border,
                    input: {
                        DEFAULT: COLORS.dark.input.base,
                        background: COLORS.dark.input.background,
                    },
                    switch: COLORS.dark.switch,
                    ring: COLORS.dark.ring,
                    chart: {
                        1: COLORS.dark.chart[1],
                        2: COLORS.dark.chart[2],
                        3: COLORS.dark.chart[3],
                        4: COLORS.dark.chart[4],
                        5: COLORS.dark.chart[5],
                    },
                    sidebar: {
                        DEFAULT: COLORS.dark.sidebar.base,
                        foreground: COLORS.dark.sidebar.foreground,
                        primary: {
                            DEFAULT: COLORS.dark.sidebar.primary.base,
                            foreground: COLORS.dark.sidebar.primary.foreground,
                        },
                        accent: {
                            DEFAULT: COLORS.dark.sidebar.accent.base,
                            foreground: COLORS.dark.sidebar.accent.foreground,
                        },
                        border: COLORS.dark.sidebar.border,
                        ring: COLORS.dark.sidebar.ring,
                    },
                },
            },
        },
    },
    plugins: [],
};
