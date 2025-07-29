'use client';

import { useEffect, useMemo, useState } from 'react';
import { Container, Title, Switch, Checkbox, Group } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const PRIBRAM_CENTER = { lat: 49.6829803, lng: 13.9908597 };

const restaurants = [
    {
        name: 'U Dudáka',
        lat: 49.2552753,
        lng: 13.9113606,
        logo: 'https://scontent.fprg4-1.fna.fbcdn.net/v/t39.30808-6/291140291_458403936285339_3161109284992074126_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xFM2FxUuU9IQ7kNvwGAnLwK&_nc_oc=AdmKgHE6DnqfyTkfzRO9_BOdLz7sTQVPyDJ9fEVH9OUltTEMT8jGyRaeU7IvKbl47Bs&_nc_zt=23&_nc_ht=scontent.fprg4-1.fna&_nc_gid=07HxFJ-pkBn0_tEAGYvMOg&oh=00_AfRHgoZk3Ft-pZGk7z8979ewDD31_vcG83B0qN_RA43Hqg&oe=688C1DFE',
        tags: ['české', 'terasa', 'klasika', 'známé'],
    },
    {
        name: 'Kavkaz',
        lat: 49.7635619,
        lng: 13.3698839,
        logo: 'https://www.bistrokavkaz.cz/wp-content/uploads/2024/06/Logo_www.png',
        tags: ['gruzínské', 'terasa', 'exotika', 'nové'],
    },
    {
        name: 'Ostrov',
        lat: 49.3060747,
        lng: 14.1419356,
        logo: 'https://scontent.fprg4-1.fna.fbcdn.net/v/t39.30808-6/245252043_3021924121398671_377373262491197621_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jEsG7gSUKwsQ7kNvwEhfKc7&_nc_oc=AdndoMSaomgCYzUSp11wZz5LM0396BcAbXvgdul8D2YRycKe-aXB6I1ekP-jbBb6CO0&_nc_zt=23&_nc_ht=scontent.fprg4-1.fna&_nc_gid=kCdSmQH2Fw5t9r1CZiV0Gw&oh=00_AfQyZ5vChkd1qx2bta-M70NfeG5QQdqrnjwCXfUopn3BBQ&oe=688BEDAC',
        tags: ['české', 'terasa', 'ostrov', 'klasika'],
    },
    {
        name: 'Atollo',
        lat: 49.6829803,
        lng: 13.9908597,
        logo: 'https://www.atollo.cz/img/engine/pub/logo.png',
        tags: ['středomořské', 'alkohol', 'pěšky', 'byl'],
    },
    {
        name: 'Taverna Thessaloniki',
        lat: 49.8925711,
        lng: 14.3990875,
        logo: 'https://scontent.fprg4-1.fna.fbcdn.net/v/t39.30808-6/359486619_807991594268363_7379150175428595955_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=i1VQuEiuiusQ7kNvwE68Qoi&_nc_oc=AdmYQffBCJHWDlIpQV__iyMQyq0UDXR6OdHlGu7jHZInaHiefAp-CYwx2h7yk-r9asI&_nc_zt=23&_nc_ht=scontent.fprg4-1.fna&_nc_gid=eUaTwVfjPwHl9R-EFuY9YQ&oh=00_AfQ3rDhzrf90THwNM62QJDDV-gH41COEqKZFnZX5ndpQgg&oe=688BEA08',
        tags: ['řecké', 'terasa', 'výlet', 'příroda', 'nové'],
    },
    {
        name: 'Na Krétě',
        lat: 49.8355606,
        lng: 13.910185,
        logo: 'https://scontent.fprg4-1.fna.fbcdn.net/v/t39.30808-6/510439684_9981576551889608_8609548201971610804_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=icToLKS8LIsQ7kNvwG6nC2X&_nc_oc=AdmHYI_xUOd-Z8gL2KNQhrokdEn1HAJ3_yjqOU74dOpnvPqHrh9fDikCSkvX9tDVtD8&_nc_zt=23&_nc_ht=scontent.fprg4-1.fna&_nc_gid=MqNtU9CoP4W1udIaL1lprA&oh=00_AfQsIzVjbzYePtk-lC1nA-nGF4yD903fsNSAJT_tqyyjeg&oe=688C0DFE',
        tags: ['řecké', 'klasika', 'byli'],
    },
    {
        name: 'Palác',
        lat: 49.9246478,
        lng: 14.3353853,
        logo: 'https://20b8a98d79.clvaw-cdnwnd.com/3b9e5df99db608ecc3e62f27d4c0be1c/200000442-1e16a1e16c/450/logo%20vetsi.webp?ph=20b8a98d79',
        tags: ['americké', 'elegantní'],
    },
    {
        name: 'Pancho’s',
        lat: 49.7375608,
        lng: 13.3877344,
        logo: 'https://www.panchos.cz/images/black-logo-colorful.png',
        tags: ['mexické', 'exotika', 'nové'],
    },
];


const availableTags = [...new Set(restaurants.flatMap((r) => r.tags))];

export default function RestaurantMapPage() {
    const [modeAll, setModeAll] = useState(false);
    const [activeTags, setActiveTags] = useState([]);
    const [highlighted, setHighlighted] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('quizResult');
        if (stored) setHighlighted(stored);
    }, []);

    const filteredRestaurants = useMemo(() => {
        if (!modeAll) {
            return restaurants.filter((r) => r.name === highlighted);
        }
        if (activeTags.length === 0) return restaurants;
        return restaurants.filter((r) => activeTags.every((tag) => r.tags.includes(tag)));
    }, [modeAll, activeTags, highlighted]);

    const toggleTag = (tag) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <Container fluid className="py-6">
                <Title order={2} className="mb-4 text-center">
                    🗺️ Mapa restaurací
                </Title>

                <Group position="center" mb="md">
                    <Switch
                        checked={modeAll}
                        onChange={(e) => setModeAll(e.currentTarget.checked)}
                        label={modeAll ? 'Zobrazit všechny' : 'Ukázat jen ideální shodu'}
                    />
                </Group>

                {modeAll && (
                    <Group justify="center" mb="md" className="flex-wrap">
                        {availableTags.map((tag) => (
                            <Checkbox
                                key={tag}
                                label={tag}
                                checked={activeTags.includes(tag)}
                                onChange={() => toggleTag(tag)}
                            />
                        ))}
                    </Group>
                )}

                <div className="w-full h-[600px] rounded-xl overflow-hidden">
                    <Map
                        center={PRIBRAM_CENTER}
                        zoom={9}
                        mapId="8a5db58daa7e1690"
                        gestureHandling="greedy"
                        disableDefaultUI={false}
                    >
                        <AdvancedMarker position={PRIBRAM_CENTER} title="Domov">
                            <IconHome color="blue" size={32} />
                        </AdvancedMarker>

                        {filteredRestaurants.map((r) => {
                            const isHighlighted = r.name === highlighted;

                            return (
                                <AdvancedMarker key={r.name} position={{ lat: r.lat, lng: r.lng }} title={r.name}>
                                    <div className="relative flex items-center justify-center">
                                        {isHighlighted && (
                                            <div className="absolute animate-ping rounded-full h-[52px] w-[52px] bg-yellow-300 opacity-50"></div>
                                        )}
                                        <div
                                            className={`rounded-full border-2 ${isHighlighted ? 'border-yellow-500 shadow-lg' : 'border-white opacity-70'
                                                }`}
                                        >
                                            <img
                                                src={r.logo}
                                                alt={r.name}
                                                width={42}
                                                height={42}
                                                className="rounded-full"
                                            />
                                        </div>
                                        {isHighlighted && (
                                            <div className="absolute -top-2 -right-2 text-yellow-500 text-xl font-bold drop-shadow">
                                                ⭐
                                            </div>
                                        )}
                                    </div>
                                </AdvancedMarker>
                            );
                        })}

                    </Map>
                </div>
            </Container>
        </APIProvider>
    );
}
