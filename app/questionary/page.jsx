'use client';
import { useEffect, useState } from 'react';
import { Container, Radio, Button, Text } from '@mantine/core';
import confetti from 'canvas-confetti';

const restaurants = [
    {
        name: 'U Dudáka',
        tags: ['české', 'terasa', 'známé', 'klasika'],
    },
    {
        name: 'Kavkaz',
        tags: ['gruzínské', 'terasa', 'nové', 'exotika'],
    },
    {
        name: 'Ostrov',
        tags: ['české', 'terasa', 'ostrov', 'klasika', 'výlet'],
    },
    {
        name: 'Atollo',
        tags: ['středomořské', 'pěšky', 'alkohol', 'byl'],
    },
    {
        name: 'Thessaloniki',
        tags: ['řecké', 'terasa', 'výlet', 'příroda', 'nové'],
    },
    {
        name: 'Na Krétě',
        tags: ['řecké', 'byli', 'klasika'],
    },
    {
        name: 'Palác',
        tags: ['americké', 'elegantní'],
    },
    {
        name: 'Pancho’s',
        tags: ['mexické', 'exotika', 'nové'],
    },
];

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
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleAnswer = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    const calculateResult = () => {
        const scoreMap = restaurants.map((r) => {
            const matched = Object.values(answers).filter((val) => r.tags.includes(val));
            return { name: r.name, score: matched.length };
        });
        const best = scoreMap.sort((a, b) => b.score - a.score)[0];
        setResult(best);
    };


    useEffect(() => {
        if (!result) return;

        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        const fire = (ratio, opts) => {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * ratio),
            });
        };

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }, [result]);


    return (
        <Container size="xs" className="py-10 space-y-6">
            <Text size="xl" fw={700}>🍽️ Najdeme ideální místo na dnešek</Text>

            {questions.map((q, i) =>
                i === 0 || Object.keys(answers).includes(questions[i - 1].key) ? (
                    <div key={q.key}>
                        <Text className="mb-2 font-semibold">{q.label}</Text>
                        <Radio.Group
                            value={answers[q.key] || ''}
                            onChange={(val) => handleAnswer(q.key, val)}
                        >
                            {q.options.map((opt) => (
                                <Radio key={opt.value} value={opt.value} label={opt.label} />
                            ))}
                        </Radio.Group>
                    </div>
                ) : null
            )}

            {!result && Object.keys(answers).length === questions.length && (
                <Button onClick={calculateResult}>Zobrazit doporučení</Button>
            )}

            {result && (
                <div className="text-center mt-6 animate-bounce">
                    <Text size="lg" fw={700}>🎉 Doporučuji:</Text>
                    <Text
                        size="xl"
                        fw={700}
                        className="text-blue-600 px-4 py-2 rounded-xl shadow-lg ring-2 ring-yellow-400 ring-offset-2"
                    >
                        {result.name}
                    </Text>
                </div>
            )}

        </Container>
    );
}
