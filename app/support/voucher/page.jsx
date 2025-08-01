'use client';
import { Text, Title } from '@mantine/core';
import PageWrapper from '@/components/PageWrapper';
import Image from 'next/image';

export default function VoucherPage() {
    return (
        <PageWrapper protect={false}>
            <div className="flex flex-col items-center text-center">
                <h1  className="mb-6 font-sans text-xl">💸 Dárková poukázka</h1>
                <p className="mb-2 max-w-md font-mono">
                    Na základě §42 odst. 3 magického úmluvního dodatku jsi oprávněn obdržet&nbsp;
                    <strong>poukázku na společnou dovolenou letadlem</strong>
                    v hodnotě <span className="font-bold font-sans text-green-600">4000 Kč</span>.
                </p>
                <p className='font-mono'>
                    (nelze vymenit na pivo nebo dalsi veci) 🍻
                </p>

                <div className="relative w-full h-[30vh]">
                    <Image
                        src="/vouchers/voucher4.png"
                        fill
                        alt='Voucher'
                        objectFit='contain'
                    />
                </div>
            </div>
        </PageWrapper>
    );
}
