import { Barriecito, Cairo_Play, Nabla, Roboto_Flex } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import MapProvider from "@/components/MapProvider";
import '../styles/globals.css'
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const barriecito = Barriecito({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-sans",
    display: "swap",
});
const cairoMono = Cairo_Play({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});
const nabla = Nabla({
    subsets: ["latin"],
    weight: "400",
    display: "swap",

    variable: "--font-nabla",
});
const robotoFlex = Roboto_Flex({
    subsets: ["latin"],
    variable: "--font-roboto",
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
            className={`${barriecito.variable} ${cairoMono.variable} ${nabla.variable} ${robotoFlex.variable}`}
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
