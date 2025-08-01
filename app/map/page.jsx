'use client';

import { useEffect, useMemo, useState } from 'react';
import { Switch, Checkbox, Group, Text, Modal, Badge } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import PageWrapper from '@/components/PageWrapper';
import MapProvider from '@/components/MapProvider';
import { restaurants } from '@/lib/restaurants';

const PRIBRAM_CENTER = { lat: 49.6829803, lng: 13.9908597 };

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
