'use client';
import { useEffect, useRef, useState } from 'react';
import { Container, Radio, Button, Text } from '@mantine/core';
import PageWrapper from '@/components/PageWrapper';
import { useRouter } from 'next/navigation';
import { restaurants } from '@/lib/restaurants';

const questions = [
    {
        key: 'dobrodruzstvi',
        label: 'Jaký typ dobrodružství tě dneska láká?',
        options: [
            { value: 'pěšky', label: 'Krátká procházka poblíž domova' },
            { value: 'výlet', label: 'Příroda a výhledy během cesty' },
            { value: 'město', label: 'Město plné vůní a barev' },
            { value: 'ostrov', label: 'Poklidný ostrovní den' },
        ],
    },
    {
        key: 'zkusenost',
        label: 'Chceš dneska zkoušet něco nového?',
        options: [
            { value: 'nové', label: 'Ano, překvap mě' },
            { value: 'klasika', label: 'Raději zůstanu u klasiky' },
            { value: 'lehce', label: 'Možná něco trochu jiného' },
            { value: 'známé', label: 'Už mám v hlavě jedno známé místo' },
        ],
    },
    {
        key: 'nálada',
        label: 'Jaká atmosféra ti dnes nejvíc sedí?',
        options: [
            { value: 'příroda', label: 'Romantika, příroda, klid' },
            { value: 'domácí', label: 'Neformální, domácí pohoda' },
            { value: 'exotika', label: 'Lehce exotická nálada' },
            { value: 'elegantní', label: 'Luxusnější a elegantní' },
        ],
    },
    {
        key: 'styl',
        label: 'Co tě víc láká?',
        options: [
            { value: 'moře', label: 'Vzpomínky na dovolenou u moře' },
            { value: 'domov', label: 'Hřejivý a známý pocit domova' },
            { value: 'výprava', label: 'Výprava do neznáma' },
            { value: 'pikantní', label: 'Něco pikantního, trochu divočina' },
        ],
    },
    {
        key: 'prostředí',
        label: 'Jak si to představuješ prostorově?',
        options: [
            { value: 'terasa', label: 'Na čerstvém vzduchu, ideálně s výhledem' },
            { value: 'klid', label: 'Je mi to jedno, hlavně ať je klid' },
            { value: 'ostrov', label: 'Něco neobvyklého, třeba i na ostrově' },
            { value: 'stylově', label: 'Stylově a pohodlně, to je základ' },
        ],
    },
];

export default function RestaurantPage() {

    const router = useRouter();

    const [answers, setAnswers] = useState({});

    const questionRefs = useRef([]);
    const buttonRef = useRef(null);

    const handleAnswer = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        const answeredKeys = Object.keys(answers);
        if (answeredKeys.length === 0) return;

        const lastIndex = answeredKeys.length;

        // pokud jsou zodpovězeny všechny, scrollni na button
        if (answeredKeys.length === questions.length && buttonRef.current) {
            buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            const nextRef = questionRefs.current[lastIndex];
            if (nextRef) {
                nextRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [answers]);

    const calculateResult = () => {
        const scoreMap = restaurants.map((r) => {
            const matched = Object.values(answers).filter((val) => r.tags.includes(val));
            return { name: r.name, score: matched.length };
        });
        const best = scoreMap.sort((a, b) => b.score - a.score)[0];

        sessionStorage.setItem('quizResult', best.name);
        router.push('/result');
    };

    return (
        <PageWrapper>
            <h1 size="xl" className='font-sans mt-20 mb-8'> Najdeme ideální místo na dnešek</h1>

            <div className='space-y-6 mb-8'>
                {questions.map((q, i) =>
                    i === 0 || Object.keys(answers).includes(questions[i - 1].key) ? (
                        <div
                            key={q.key}
                            ref={(el) => (questionRefs.current[i] = el)}
                            className="scroll-mb-40"
                        >
                            <p className="mb-4 text-left  font-semibold text-lg font-mono">{q.label}</p>
                            <Radio.Group
                                value={answers[q.key] || ''}
                                onChange={(val) => handleAnswer(q.key, val)}
                            >
                                {q.options.map((opt) => (
                                    <Radio
                                        size='md'
                                        key={opt.value}
                                        value={opt.value}
                                        label={opt.label}
                                        classNames={{ root: 'mb-2', label: 'font-dongle' }}
                                    />
                                ))}
                            </Radio.Group>
                        </div>
                    ) : null
                )}
            </div>
            {Object.keys(answers).length === questions.length && (
                <Button
                    ref={buttonRef}
                    classNames={{ label: 'font-kablammo tracking-widest font-medium', root: 'animate-bounce mb-20' }}
                    onClick={calculateResult}>
                    Zobrazit doporučení
                </Button>
            )}

        </PageWrapper>
    );
}
