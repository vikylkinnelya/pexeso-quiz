'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';

/**
 * Obecný wrapper pro stránky s centrem, layoutem a načtením uživatele ze sessionStorage.
 * @param {string} storageKey - klíč v sessionStorage, např. 'quizUser'
 * @param {ReactNode|function} children - JSX obsah stránky nebo funkce (user) => JSX
 * @param {function} [onReady] - volitelné: callback po načtení uživatele
 * @param {boolean} [protect=true] - přesměrování na /start pokud není user
 */
export default function PageWrapper({
    children,
    storageKey = 'quizUser',
    onReady,
    protect = true,
}) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const stored = sessionStorage.getItem(storageKey);
        if (!stored && protect) {
            router.replace('/start');
        } else if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            onReady?.(parsed);
        }
    }, []);

    // chráníme jen pokud protect=true
    if (protect && !user) return null;

    return (
        <Container
            size="xs"
            className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        >
            {typeof children === 'function' ? children(user) : children}
        </Container>
    );
}
