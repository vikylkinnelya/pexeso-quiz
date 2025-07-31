'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';
import PageWrapper from '@/components/PageWrapper';

const photos = [
    '/pexeso/foto1.png',
    '/pexeso/foto2.png',
    '/pexeso/foto3.png',
    '/pexeso/foto4.png',
    '/pexeso/foto5.png',
    '/pexeso/foto6.png',
    '/pexeso/foto7.png',
    '/pexeso/foto8.png',
];

const generateDeck = () => {
    const base = photos.map((src, index) => ({
        id: index, // id = skupina
        src,
    }));
    const doubled = [...base, ...base]; // duplikujeme objekty
    return doubled.sort(() => Math.random() - 0.5);
};


export default function PexesoPage() {
    const router = useRouter();

    const [deck, setDeck] = useState(generateDeck);

    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [solved, setSolved] = useState(false);
    const [elapsed, setElapsed] = useState(0);

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
            if (deck[i1].id === deck[i2].id) {
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
        <PageWrapper>
            {user => (
                <>
                    <h1 className="text-lg mb-2 font-semibold font-sans tracking-wide">Spoj všechny páry, {user?.name} 👀</h1>
                    <p className="mb-4 text-sm font-mono">
                        Čas: <span className="font-mono">{formatTime(elapsed)}</span>
                    </p>
                    <p className="mb-4 text-xs font-mono">
                        P.S je tu na strance bug, proto nez zacnes delat pezeso musis si vyzoomovat obrazovku (zmensit ji).
                        Teprve po tom to zacne fungovat. Testovane na ipxonu.
                    </p>
                    <div className="grid grid-cols-4 gap-2 w-full max-w-sm perspective mb-6">
                        {deck.map((card, i) => {
                            const isFlipped = flipped.includes(i) || matched.includes(i);
                            return (
                                <div
                                    key={i}
                                    onClick={() => handleClick(i)}
                                    className="relative w-full aspect-square"
                                >
                                    <div
                                        className={`transition-transform duration-500 w-full h-full [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''}`}
                                    >
                                        <img
                                            src={card.src}
                                            alt=""
                                            className="absolute w-full h-full object-cover rounded-md [backface-visibility:hidden] rotate-y-180"
                                        />
                                        <div className="absolute w-full h-full bg-blue-400 rounded-md [backface-visibility:hidden] flex items-center justify-center text-white text-2xl font-bold">
                                            ❓
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        }
                    </div>

                    <Button
                        classNames={{ label: 'font-kablammo tracking-widest font-medium', root: solved? 'animate-bounce' : 'animate-pulse' }}
                        disabled={!solved}
                        onClick={() => router.push('/waiting')}
                    >
                        Pokračovat
                    </Button>

                </>
            )}
        </PageWrapper>
    );
}
