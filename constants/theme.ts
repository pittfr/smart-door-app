export type ThemePalette = {
    background: string;
    foreground: string;
    card: {
        base: string;
        foreground: string;
    };
    popover: {
        base: string;
        foreground: string;
    };
    primary: {
        base: string;
        dark: string;
        light: string;
        foreground: string;
    };
    secondary: {
        base: string;
        dark: string;
        light: string;
        foreground: string;
    };
    muted: {
        base: string;
        foreground: string;
    };
    accent: {
        base: string;
        foreground: string;
    };
    destructive: {
        base: string;
        foreground: string;
    };
    success: {
        base: string;
        foreground: string;
    };
    border: string;
    input: {
        base: string;
        background: string;
    };
    ring: string;
    chart: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
    };
    sidebar: {
        base: string;
        foreground: string;
        primary: {
            base: string;
            foreground: string;
        };
        accent: {
            base: string;
            foreground: string;
        };
        border: string;
        ring: string;
    };
};

export const COLORS: { light: ThemePalette; dark: ThemePalette } = {
    light: {
        background: "#F1F5F9",
        foreground: "#1E293B",
        card: {
            base: "#FFFFFF",
            foreground: "#1E293B",
        },
        popover: {
            base: "#FFFFFF",
            foreground: "#1E293B",
        },
        primary: {
            base: "#1E3A8A",
            dark: "#1E293B",
            light: "#3B82F6",
            foreground: "#FFFFFF",
        },
        secondary: {
            base: "#14B8A6",
            dark: "#0D9488",
            light: "#2DD4BF",
            foreground: "#FFFFFF",
        },
        muted: {
            base: "#E2E8F0",
            foreground: "#64748B",
        },
        accent: {
            base: "#14B8A6",
            foreground: "#FFFFFF",
        },
        destructive: {
            base: "#EF4444",
            foreground: "#FFFFFF",
        },
        success: {
            base: "#22C55E",
            foreground: "#FFFFFF",
        },
        border: "#CBD5E1",
        input: {
            base: "transparent",
            background: "#F8FAFC",
        },
        ring: "#94A3B8",
        chart: {
            1: "#E74C3C",
            2: "#3498DB",
            3: "#34495E",
            4: "#F39C12",
            5: "#E67E22",
        },
        sidebar: {
            base: "#FBFBFB",
            foreground: "#252525",
            primary: {
                base: "#030213",
                foreground: "#FBFBFB",
            },
            accent: {
                base: "#F7F7F7",
                foreground: "#343434",
            },
            border: "#EBEBEB",
            ring: "#B5B5B5",
        },
    },
    dark: {
        background: "#0F172A",
        foreground: "#F1F5F9",
        card: {
            base: "#1E293B",
            foreground: "#FFFFFF",
        },
        popover: {
            base: "#1E293B",
            foreground: "#F1F5F9",
        },
        primary: {
            base: "#3B82F6",
            dark: "#1E3A8A",
            light: "#60A5FA",
            foreground: "#FFFFFF",
        },
        secondary: {
            base: "#14B8A6",
            dark: "#0D9488",
            light: "#2DD4BF",
            foreground: "#FFFFFF",
        },
        muted: {
            base: "#334155",
            foreground: "#94A3B8",
        },
        accent: {
            base: "#14B8A6",
            foreground: "#FFFFFF",
        },
        destructive: {
            base: "#EF4444",
            foreground: "#FFFFFF",
        },
        success: {
            base: "#22C55E",
            foreground: "#FFFFFF",
        },
        border: "#475569",
        input: {
            base: "#334155",
            background: "#F3F3F5",
        },
        ring: "#64748B",
        chart: {
            1: "#8B5CF6",
            2: "#10B981",
            3: "#E67E22",
            4: "#EC4899",
            5: "#EF4444",
        },
        sidebar: {
            base: "#1E293B",
            foreground: "#F1F5F9",
            primary: {
                base: "#8b5cf6",
                foreground: "#F1F5F9",
            },
            accent: {
                base: "#334155",
                foreground: "#F1F5F9",
            },
            border: "#334155",
            ring: "#64748B",
        },
    },
} as const;
