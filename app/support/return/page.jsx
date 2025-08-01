'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button, Text } from '@mantine/core';
import PageWrapper from '@/components/PageWrapper';

export default function ReturnPage() {
    const router = useRouter();

    // uživatel už dar odmítl → nepustíme ho zpět
    useEffect(() => {
        if (sessionStorage.getItem('returnUsed') === '1') {
            router.replace('/map'); // nebo jinam
        }
    }, []);

    const handleChoose = (path) => {
        sessionStorage.setItem('returnUsed', '1');
        router.push(path);
    };

    return (
        <PageWrapper protect={false}>
            <div className="text-center space-y-4">
                <h1 className='text-xl font-sans mt-20 mb-6'>🎁 Nelíbí se Vam dárek?</h1>
                <h2 className='text-xl tracking-widest font-kablammo' >Seš posral?! 🤨</h2>
                <p className="font-mono">Dobře no... můžeš zkusit výměnu:</p>

                <div className="flex flex-col mt-6 gap-4" >
                    <Button
                        color="yellow"
                        onClick={() => handleChoose('/support/voucher')}
                        classNames={{ label: 'font-sans tracking-widest font-medium' }}
                    >
                        💸 Vyměnit za poukázku
                    </Button>
                    <Button
                        color="blue"
                        onClick={() => handleChoose('/support/exchange')}
                        classNames={{ label: 'font-sans tracking-widest font-medium'}}
                    >
                        🎅 Vyměnit za jiné zboží
                    </Button>
                </div>
            </div>
        </PageWrapper>
    );
}
