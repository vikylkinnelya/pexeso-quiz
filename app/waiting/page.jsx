'use client';

import { useEffect, useState } from 'react';
import { Button, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function WaitingPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('quizUser');
    if (!stored) router.replace('start');
    else setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!user) return;

    const scalar = 2;
    const shape = confetti.shapeFromText({ text: '👺', scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [shape],
      scalar
    };

    function shoot() {
      confetti({ ...defaults, particleCount: 30 });
      confetti({ ...defaults, particleCount: 5, flat: true });
      confetti({ ...defaults, particleCount: 15, scalar: scalar / 2, shapes: ['circle'] });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, [user]);

  if (!user) return null;

  return (
    <Container size="xs" className="min-h-screen flex flex-col items-center justify-center px-4 text-center ">
      <h1 className="text-2xl font-bold mb-4 font-nabla tracking-wide">🎁 {user.name}, něco na tebe ještě čeká…</h1>
      <p className="mb-6 text-lg font-mono">Ale ještě si budeš muset chviličku počkat 😉</p>
      <Button onClick={() => router.push('/questionary')}>
        Vyplnit dotazník
      </Button>
    </Container>
  );
}
