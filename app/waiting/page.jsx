'use client';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import PageWrapper from '@/components/PageWrapper';


export default function WaitingPage() {
  const router = useRouter();

  const handleConfetti = (user) => {
    const scalar = 2;
    const shape = confetti.shapeFromText({ text: '👺', scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [shape],
      scalar,
    };

    setTimeout(() => confetti({ ...defaults, particleCount: 30 }), 0);
    setTimeout(() => confetti({ ...defaults, particleCount: 5, flat: true }), 100);
    setTimeout(() => confetti({ ...defaults, particleCount: 15, scalar: scalar / 2, shapes: ['circle'] }), 200);
  };

  return (
    <PageWrapper onReady={handleConfetti}>
      {(user) => (
        <>
          <h1 className="text-2xl font-bold mb-4 font-kablammo tracking-wide">
            🎁 {user.name}, něco na tebe ještě čeká…
          </h1>
          <p className="mb-6 text-lg font-mono">Ale ještě si budeš muset chviličku počkat 😉</p>

          <p className="mb-6 text-base text-center max-w-md font-sans">
            Protože jsi to pexeso zvládl tak krásně, dostaneš ještě jeden menší dáreček,
            <br />
            ať se náhodou nenudíš.
            <br />
            Je stejně krásný jako to síťko pro maminku. 🎁✨Najsi si to !
          </p>
          <Button
            classNames={{ label: 'font-kablammo tracking-widest font-medium' }}
            onClick={() => router.push('/questionary')}>
            Vyplnit dotazník
          </Button>
        </>
      )}
    </PageWrapper>
  );
}
