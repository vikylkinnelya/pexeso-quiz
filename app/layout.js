import { Barriecito, Cairo_Play, Nabla, Roboto_Flex } from "next/font/google";
import "./globals.css";
import {  ColorSchemeScript, MantineProvider } from "@mantine/core";
import MapProvider from "@/components/MapProvider";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


const barriecito = Barriecito({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-sans",
});
const cairoMono = Cairo_Play({
    subsets: ["latin"],
    variable: "--font-mono",
});
const nabla = Nabla({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-nabla",
});
const robotoFlex = Roboto_Flex({
    subsets: ["latin"],
    variable: "--font-roboto",
});

export const metadata = {
    title: "Narozeninový kvíz",
    description: "Personalizovaný zážitek s pexesem, přáním a mapou",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="cs"
            className={`${barriecito.variable} ${cairoMono.variable} ${nabla.variable} ${robotoFlex.variable} font-sans`}
            data-mantine-color-scheme="light"
        >
            <head>
                <ColorSchemeScript />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    <MapProvider>{children}</MapProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
