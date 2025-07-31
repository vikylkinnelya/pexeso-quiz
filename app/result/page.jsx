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
                    <h1 size="xl" fw={700} className="font-sans">🎉 Doporučuji:</h1>
                    <p size="2xl" fw={900} className="text-blue-600 px-4 py-2 rounded-xl shadow-lg ring-2 ring-yellow-400 ring-offset-2">
                        {result}
                    </p>
                    <Button className="mt-6" onClick={() => router.push('/map')}>
                        Zobrazit na mapě
                    </Button>
                </>
            )}
        </PageWrapper>
    );
}
