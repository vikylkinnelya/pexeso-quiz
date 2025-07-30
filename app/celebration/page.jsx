'use client';

import { useEffect, useState } from 'react';
import { Button, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function CelebrationPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const stored = sessionStorage.getItem('quizUser');
        if (!stored) {
            router.replace('start');
        } else {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    }, []);

    const getAge = (birthdateStr) => {
        const birth = new Date(birthdateStr);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    if (!user) return null;

    return (
        <Container className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 text-center px-4 text-black">
            <h1 className="text-2xl font-bold mb-4 font-roboto">🎉 Ahoj {user.name}!</h1>
            <p className="text-lg mb-2 font-sans tracking-wide">Gratuluju k narozeninám 🥳</p>
            <p className="text-lg mb-2 font-sans tracking-wide">
                Dneska ti je krásných <strong>{getAge(user.birthday)} let</strong>!
            </p>

            <div className="mb-6 mt-4 max-w-md font-roboto">
                <p className="text-base mb-2 font-semibold">🎁 První dárek je pro tebe připraven:</p>
                <p className="text-sm mb-2 font-mono">
                    Stáhni si soubor&nbsp;
                    <a
                        href="/poukaz.rar"
                        download
                        className="text-blue-600 underline underline-offset-2 border-dshed"
                    >
                        poukaz.rar
                    </a>
                    .
                </p>
                <p className="text-sm font-mono">
                    Je zaheslovaný – heslo je celé tvoje datum narození <strong>ve formátu pouze čísla</strong>, např. <code>02031998</code>.
                </p>
            </div>

            <p className="mb-6 font-sans tracking-normal">Chceš pokračovat za dalším překvapením? 👇</p>
            <Button onClick={() => router.push('/pexeso')}>Pokračovat</Button>
        </Container>
    );

}