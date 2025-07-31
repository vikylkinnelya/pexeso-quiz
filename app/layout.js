import { Eagle_Lake, Grenze_Gotisch, Kablammo, Dongle } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import MapProvider from "@/components/MapProvider";
import '../styles/globals.css'
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const eagleLake = Eagle_Lake({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-sans",
    display: "swap",
});
const grenzeGotisch = Grenze_Gotisch({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});
const kablammo = Kablammo({
    subsets: ["latin"],
    weight: "400",
    display: "swap",

    variable: "--font-kablammo",
});
const dongle = Dongle({
    subsets: ["latin"],
    weight: '400',
    variable: "--font-dongle",
    display: "swap",
});

export const metadata = {
    title: "Quiz",
    description: "Personalizovaný kvíz",
    manifest: "/manifest.json",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="cs"
            className={`${eagleLake.variable} ${grenzeGotisch.variable} ${kablammo.variable} ${dongle.variable}`}
            data-mantine-color-scheme="dark"
        >
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <MantineProvider withGlobalStyles withNormalizeCSS defaultColorScheme="dark">
                    <MapProvider>{children}</MapProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
