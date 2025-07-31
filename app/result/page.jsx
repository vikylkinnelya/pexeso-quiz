'use client';
import { useEffect, useState } from 'react';
import { Text, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import PageWrapper from '@/components/PageWrapper';

export default function ResultPage() {
    const [result, setResult] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const stored = sessionStorage.getItem('quizResult');
        if (!stored) router.replace('/restaurant');
        else setResult(stored);

        // animace
        const count = 200;
        const defaults = { origin: { y: 0.7 } };
        const fire = (r, o) => confetti({ ...defaults, ...o, particleCount: Math.floor(count * r) });

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }, []);

    if (!result) return null;

    return (
        <PageWrapper protect={false}>
            {() => (
                <>
                    <h1 size="xl" fw={700} className="font-sans">🍽️ Doporučuji:</h1>
                    <h2 size="2xl" fw={900} className=" px-4 py-2 text-xl font-sans">
                        {result}
                    </h2>
                    <Button
                        classNames={{ label: 'font-kablammo tracking-widest font-medium', root: 'animate-bounce mt-20' }}
                        onClick={() => router.push('/map')}>
                        Zobrazit na mapě
                    </Button>

                    {/* Velký obrázek dole uprostřed */}
                    <img
                        src="/stickers/foto1.png"
                        alt="main"
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full rotate-2"
                    />

                    {/* 3 menší chaoticky umístěné nálepky */}
                    <img
                        src="/stickers/foto2.png"
                        alt="heart"
                        className="absolute top-6 left-4 w-1/3 rotate-[-12deg]"
                    />
                    <img
                        src="/stickers/foto3.png"
                        alt="star"
                        className="absolute top-8 right-6 w-1/2 rotate-[18deg]"
                    />
                    <img
                        src="/stickers/foto4.png"
                        alt="smile"
                        className="absolute bottom-40 right-8 w-2/5 rotate-[-6deg]"
                    />
                
                </>
            )
}
        </PageWrapper >
    );
}
