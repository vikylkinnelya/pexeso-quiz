'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';

const photos = [
    '/images/foto1.jpg',
    '/images/foto2.jpg',
    '/images/foto3.jpg',
    '/images/foto4.jpg',
    '/images/foto5.jpg',
    '/images/foto6.jpg',
    '/images/foto7.jpg',
    '/images/foto8.jpg',
];

const generateDeck = () => {
    const doubled = [...photos, ...photos];
    return doubled.sort(() => Math.random() - 0.5);
};

export default function PexesoPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [deck, setDeck] = useState(generateDeck);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [solved, setSolved] = useState(false);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const stored = sessionStorage.getItem('quizUser');
        if (!stored) router.replace('start');
        else setUser(JSON.parse(stored));
    }, []);

    // časovač
    useEffect(() => {
        if (solved) return;

        const interval = setInterval(() => {
            setElapsed((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [solved]);

    // vyhodnocení výhry
    useEffect(() => {
        if (matched.length === deck.length) {
            setSolved(true);
            sessionStorage.setItem('quizTime', elapsed.toString());
        }
    }, [matched, deck.length, elapsed]);

    const handleClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [i1, i2] = newFlipped;
            if (deck[i1] === deck[i2]) {
                setMatched((prev) => [...prev, i1, i2]);
            }
            setTimeout(() => setFlipped([]), 800);
        }
    };

    const formatTime = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-2 py-6">
            <h2 className="text-lg mb-2 font-semibold">Spoj všechny páry, {user?.name} 👀</h2>
            <p className="mb-4 text-sm text-gray-600">
                Čas: <span className="font-mono">{formatTime(elapsed)}</span>
            </p>

            <div className="grid grid-cols-4 gap-2 w-full max-w-sm perspective">
                {deck.map((src, i) => {
                    const isFlipped = flipped.includes(i) || matched.includes(i);
                    return (
                        <div
                            key={i}
                            onClick={() => handleClick(i)}
                            className="relative w-full aspect-square"
                        >
                            <div
                                className={`transition-transform duration-500 w-full h-full [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''
                                    }`}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="absolute w-full h-full object-cover rounded-md [backface-visibility:hidden] rotate-y-180"
                                />
                                <div className="absolute w-full h-full bg-blue-400 rounded-md [backface-visibility:hidden] flex items-center justify-center text-white text-2xl font-bold">
                                    ❓
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Button className="mt-6" disabled={!solved} onClick={() => router.push('/waiting')}>
                Pokračovat
            </Button>
        </div>
    );
}
