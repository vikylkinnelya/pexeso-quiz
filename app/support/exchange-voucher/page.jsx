'use client';
import { Text, Title } from '@mantine/core';
import PageWrapper from '@/components/PageWrapper';
import Image from 'next/image';

export default function ExchangeVoucherPage() {
    return (
        <PageWrapper protect={false}>

            <h1 order={2} className="mb-4 font-sans">📎 Doplňkový poukaz</h1>
            <p className="mb-2 max-w-md font-mono text-pretty">
                K novému zboží ti náleží symbolický bonusový poukaz
                <br />
                v hodnotě&nbsp;
                <span className="font-bold font-sans text-green-600 ">1000 Kč</span>.
            </p>
            <p className='font-sans'>
                Využij ho moudře. 🤓
            </p>

            <div className="mt-6 relative w-full h-[30vh] animate-pulse">
                <Image
                    src="/vouchers/voucher1.png"
                    fill
                    alt='Voucher'
                    objectFit='contain'
                />
            </div>

        </PageWrapper>
    );
}
