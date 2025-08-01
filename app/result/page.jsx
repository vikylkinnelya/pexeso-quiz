'use client';
import { useEffect, useState } from 'react';
import { Text, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import PageWrapper from '@/components/PageWrapper';
import Image from 'next/image';

export default function ResultPage() {
    const [result, setResult] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const stored = sessionStorage.getItem('quizResult');
        if (!stored) router.replace('/start');
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
        <PageWrapper protect={true}>
            {() => (
                <div className="relative w-screen h-screen  flex flex-col justify-center items-center text-center">
                    <h1 className="font-sans text-xl font-bold">🍽️ Doporučuji:</h1>
                    <h2 className="font-sans text-2xl font-extrabold">{result}</h2>

                    <Button
                        classNames={{
                            label: 'font-kablammo tracking-widest font-medium',
                            root: 'animate-bounce mt-10',
                        }}
                        onClick={() => router.push('/map')}
                    >
                        Zobrazit na mapě
                    </Button>

                    {/* Velký obrázek dole uprostřed */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rotate-2 w-60 h-auto">
                        <Image
                            src="/stickers/foto1.png"
                            alt="main"
                            width={240}
                            height={240}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* 3 menší chaotické nálepky */}
                    <div className="absolute top-6 left-4 w-32 rotate-[-12deg]">
                        <Image src="/stickers/foto2.png" alt="heart" width={128} height={128} />
                    </div>

                    <div className="absolute top-8 right-6 w-48 rotate-[18deg]">
                        <Image src="/stickers/foto3.png" alt="star" width={192} height={192} />
                    </div>

                    <div className="absolute bottom-40 right-8 w-40 rotate-[-6deg]">
                        <Image src="/stickers/foto4.png" alt="smile" width={160} height={160} />
                    </div>
                </div>
            )}
        </PageWrapper>
    );
}
