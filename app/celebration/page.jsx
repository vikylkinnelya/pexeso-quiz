'use client';

import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 text-center px-4">
            <h1 className="text-2xl font-bold mb-4">🎉 Ahoj {user.name}!</h1>
            <p className="text-lg mb-2">Gratuluju k narozeninám 🥳</p>
            <p className="text-lg mb-6">Dneska ti je krásných <strong>{getAge(user.birthday)} let</strong>!</p>
            <p className="mb-6">Chceš si vyzvednout dáreček? Tak pojď dál 👇</p>
            <Button onClick={() => router.push('/pexeso')}>Pokračovat</Button>
        </div>
    );
}
