'use client';
import { Text, Title } from '@mantine/core';
import PageWrapper from '@/components/PageWrapper';
import Image from 'next/image';

export default function ExchangePage() {
    return (
        <PageWrapper protect={false}>
            <div className="flex flex-col items-center text-center">
                <h1 className="mb-4 font-sans text-xl">🎅 Výmena úspěšně provedena</h1>

                <p className="max-w-md mb-2 font-mono text-pretty">
                    Na základě čl. VII odst. 12 magického kodexu byl tvůj požadavek na výměnu uznán.
                </p>
                <p className='mb-6 font-mono'>
                    Nové zboží bylo expresně doručeno <strong>Svatým Santou</strong> přímo do krbu.
                </p>


                {/* Obrázek Santy s krbem */}
                <div className="relative w-full h-[30vh] animate-pulse">
                    <Image
                        src="/vouchers/santa.png"
                        fill
                        alt='Voucher'
                        objectFit='contain'
                    />
                </div>
                <p className='mb-4 font-kablammo tracking-widest'>
                    Už si nestěžuj. 🔥🎁
                </p>

            </div>
        </PageWrapper>
    );
}
