'use client';

import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import PageWrapper from '@/components/PageWrapper';

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
        <PageWrapper>
            {user => (
                <>
                    <h1 className="text-2xl font-bold mb-4 font-sans tracking-wide">🎉 Ahoj {user.name}!</h1>
                    <h2 className="text-lg mb-1 font-sans tracking-wide">Gratuluju k narozeninám 🥳</h2>
                    <h3 className="text-lg mb-2 font-sans tracking-wide">
                        Dneska ti je krásných <strong>{getAge(user.birthday)} let</strong>!
                    </h3>

                    <div className="mb-6 mt-4 max-w-md font-mono">
                        <p className="text-base mb-2">🎁 První dárek je pro tebe připraven:</p>
                        <p className="text-sm mb-4">
                            <a
                                href="/poukaz.pdf"
                                download
                                className=" text-yellow-300 text-base border-red-400 border-2 py-1 px-2 border-dashed font-kablammo"
                            >
                                Stáhni si soubor 💾
                            </a>
                            .
                        </p>
                        <p className="w-3/4 mx-auto text-sm font-mono mt-2">
                            Je zaheslovaný – heslo je celé tvoje datum narození <strong>ve formátu pouze čísla</strong>, např. <code>02031998</code>.
                        </p>
                    </div>

                    <p className="mb-6 font-sans tracking-normal">Chceš pokračovat za dalším překvapením? 👇</p>
                    <Button
                        classNames={{ label: 'font-kablammo animate-pulse tracking-widest font-medium' }}
                        onClick={() => router.push('/pexeso')}
                    >
                        Pokračovat
                    </Button>
                </>
            )}
        </PageWrapper>
    );

}