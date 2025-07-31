'use client';

import { useEffect, useMemo, useState } from 'react';
import { Switch, Checkbox, Group, Text, Modal, Badge } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import PageWrapper from '@/components/PageWrapper';
import MapProvider from '@/components/MapProvider';

const PRIBRAM_CENTER = { lat: 49.6829803, lng: 13.9908597 };

const restaurants = [
    {
        name: 'U Dudáka',
        lat: 49.2552753,
        lng: 13.9113606,
        logo: 'https://scontent.fprg4-1.fna.fbcdn.net/v/t39.30808-6/291140291_458403936285339_3161109284992074126_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xFM2FxUuU9IQ7kNvwGAnLwK&_nc_oc=AdmKgHE6DnqfyTkfzRO9_BOdLz7sTQVPyDJ9fEVH9OUltTEMT8jGyRaeU7IvKbl47Bs&_nc_zt=23&_nc_ht=scontent.fprg4-1.fna&_nc_gid=07HxFJ-pkBn0_tEAGYvMOg&oh=00_AfRHgoZk3Ft-pZGk7z8979ewDD31_vcG83B0qN_RA43Hqg&oe=688C1DFE',
        tags: ['české', 'terasa', 'klasika', 'známé'],
        address: 'A. Šťastného 171, 386 01 Strakonice' // z webu :contentReference[oaicite:1]{index=1}
    },
    {
        name: 'Kavkaz',
        lat: 49.7635619,
        lng: 13.3698839,
        logo: 'https://www.bistrokavkaz.cz/wp-content/uploads/2024/06/Logo_www.png',
        tags: ['gruzínské', 'terasa', 'exotika', 'nové'],
        address: 'Lidická 481/13, 323 00 Plzeň' // z webu :contentReference[oaicite:2]{index=2}
    },
    {
        name: 'Ostrov',
        lat: 49.3060747,
        lng: 14.1419356,
        logo: 'https://scontent.fprg4-1.fna.fbcdn.net/v/t39.30808-6/245252043_3021924121398671_377373262491197621_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=jEsG7gSUKwsQ7kNvwEhfKc7&_nc_oc=AdndoMSaomgCYzUSp11wZz5LM0396BcAbXvgdul8D2YRycKe-aXB6I1ekP-jbBb6CO0&_nc_zt=23&_nc_ht=scontent.fprg4-1.fna&_nc_gid=kCdSmQH2Fw5t9r1CZiV0Gw&oh=00_AfQyZ5vChkd1qx2bta-M70NfeG5QQdqrnjwCXfUopn3BBQ&oe=688BEDAC',
        tags: ['české', 'terasa', 'ostrov', 'klasika'],
        address: 'Na Ostrově 165, 397 01 Písek' // až z webu :contentReference[oaicite:3]{index=3}
    },
    {
        name: 'Atollo',
        lat: 49.6829803,
        lng: 13.9908597,
        logo: 'https://www.atollo.cz/img/engine/pub/logo.png',
        tags: ['středomořské', 'alkohol', 'pěšky', 'byl'],
        address: 'Mariánská 285, 261 01 Příbram' // z webu :contentReference[oaicite:4]{index=4}
    },
    {
        name: 'Taverna Thessaloniki',
        lat: 49.8925711,
        lng: 14.3990875,
        logo: 'https://scontent.fprg4-1.fna.fbcdn.net/v/t39.30808-6/359486619_807991594268363_7379150175428595955_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=i1VQuEiuiusQ7kNvwE68Qoi&_nc_oc=AdmYQffBCJHWDlIpQV__iyMQyq0UDXR6OdHlGu7jHZInaHiefAp-CYwx2h7yk-r9asI&_nc_zt=23&_nc_ht=scontent.fprg4-1.fna&_nc_gid=eUaTwVfjPwHl9R-EFuY9YQ&oh=00_AfQ3rDhzrf90THwNM62QJDDV-gH41COEqKZFnZX5ndpQgg&oe=688BEA08',
        tags: ['řecké', 'terasa', 'výlet', 'příroda', 'nové'],
        address: 'Vltavská 168, 252 06 Davle (směr Praha)' // z firmay? použito tripadvisor Davle :contentReference[oaicite:5]{index=5}
    },
    {
        name: 'Na Krétě',
        lat: 49.8355606,
        lng: 13.910185,
        logo: 'https://scontent.fprg4-1.fna.fbcdn.net/v/t39.30808-6/510439684_9981576551889608_8609548201971610804_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=icToLKS8LIsQ7kNvwG6nC2X&_nc_oc=AdmHYI_xUOd-Z8gL2KNQhrokdEn1HAJ3_yjqOU74dOpnvPqHrh9fDikCSkvX9tDVtD8&_nc_zt=23&_nc_ht=scontent.fprg4-1.fna&_nc_gid=MqNtU9CoP4W1udIaL1lprA&oh=00_AfQsIzVjbzYePtk-lC1nA-nGF4yD903fsNSAJT_tqyyjeg&oe=688C0DFE',
        tags: ['řecké', 'klasika', 'byli'],
        address: 'Milinovského 908/6, 268 01 Hořovice' // z webu :contentReference[oaicite:6]{index=6}
    },
    {
        name: 'Palác',
        lat: 49.9246478,
        lng: 14.3353853,
        logo: 'https://20b8a98d79.clvaw-cdnwnd.com/3b9e5df99db608ecc3e62f27d4c0be1c/200000442-1e16a1e16c/450/logo%20vetsi.webp?ph=20b8a98d79',
        tags: ['americké', 'elegantní'],
        address: 'Všenorská 45, 252 02 Jíloviště (směr Praha)' // z Yelp :contentReference[oaicite:7]{index=7}

    },
    {
        name: 'Pancho’s',
        lat: 49.7375608,
        lng: 13.3877344,
        logo: 'https://www.panchos.cz/images/black-logo-colorful.png',
        tags: ['mexické', 'exotika', 'nové'],
        address: 'Slovanská 16, 326 00 Plzeň' // z webu :contentReference[oaicite:8]{index=8}
    },
];

const availableTags = [...new Set(restaurants.flatMap((r) => r.tags))];

export default function RestaurantMapPage() {
    const [modeAll, setModeAll] = useState(false);
    const [activeTags, setActiveTags] = useState([]);
    const [highlighted, setHighlighted] = useState(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('quizResult');
        if (stored) setHighlighted(stored); // např. zvýraznění na mapě
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

    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    return (
        <MapProvider>
            <PageWrapper protect={false}>

                <>
                    <h1 order={2} className="my-4 text-center font-sans">
                        🗺️ Mapa restaurací
                    </h1>

                    <Group position="center" mb="md">
                        <Switch
                            checked={modeAll}
                            onChange={(e) => setModeAll(e.currentTarget.checked)}
                            label={modeAll ? 'Zobrazit všechny' : 'Ukázat jen ideální shodu'}
                            classNames={{ label: 'font-mono' }}
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
                            defaultCenter={PRIBRAM_CENTER}
                            defaultZoom={9}
                            mapId="8a5db58daa7e1690"
                            gestureHandling="greedy"
                            disableDefaultUI={false}
                        >
                            <AdvancedMarker position={PRIBRAM_CENTER} title="Domov">
                                <IconHome color="blue" size={32} />
                            </AdvancedMarker>

                            <Modal
                                opened={!!selectedRestaurant}
                                onClose={() => setSelectedRestaurant(null)}
                                title={<div className='block ml-[28px]'>{selectedRestaurant?.name}</div>}
                                centered
                                classNames={{ title: 'text-center w-full' }}
                            >
                                {selectedRestaurant && (
                                    <div className="text-center space-y-4">
                                        <img
                                            src={selectedRestaurant.logo}
                                            alt={selectedRestaurant.name}
                                            className="w-24 h-24 rounded-full mx-auto"
                                        />
                                        <p className="text-sm text-gray-200 ">{selectedRestaurant.address}</p>
                                        <div className="flex flex-wrap justify-center gap-2 mb-2">
                                            {selectedRestaurant.tags.map((tag) => (
                                                <Badge key={tag} variant="light" color="blue" size="sm">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Modal>

                            {filteredRestaurants.map((r) => {
                                const isHighlighted = r.name === highlighted;

                                return (
                                    <AdvancedMarker
                                        key={r.name}
                                        position={{ lat: r.lat, lng: r.lng }}
                                        title={r.name}
                                        onClick={() => setSelectedRestaurant(r)}
                                    >
                                        <div className="relative flex items-center justify-center">
                                            {isHighlighted && (
                                                <div className="absolute animate-ping rounded-full h-[52px] w-[52px] bg-yellow-300"></div>
                                            )}
                                            <div
                                                className={`rounded-full border-2 ${isHighlighted ? 'border-yellow-500 shadow-lg' : 'border-white'
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

                    <div className="mt-6 space-y-4 mb-20">
                        {filteredRestaurants.map((r) => (
                            <div key={r.name} className="relative flex space-between items-start bg-white rounded-lg shadow-md p-4">
                                {r.name === highlighted && (
                                    <div className="absolute -top-2 -right-2 text-yellow-500 text-xl font-bold drop-shadow">
                                        ⭐
                                    </div>
                                )}
                                <img src={r.logo} alt={r.name} className="w-12 h-12 rounded-full flex-shrink-0 mr-4" />
                                <div className="flex flex-col text-black w-full">
                                    <Text size="lg" fw={700} className="font-sans ">{r.name}</Text>
                                    <Text size="sm">{r.address || 'Adresa neznámá'}</Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </>

            </PageWrapper>
        </MapProvider>
    );
}
