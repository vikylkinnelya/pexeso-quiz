'use client';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { TextInput, Button, Container } from '@mantine/core';
import { DateInput, DatePickerInput } from '@mantine/dates';
import { useRouter } from 'next/navigation';
import 'dayjs/locale/cs';
import PageWrapper from '@/components/PageWrapper';

export default function QuizStartPage() {
    const methods = useForm();
    const router = useRouter();

    const onSubmit = (data) => {
        sessionStorage.setItem('quizUser', JSON.stringify(data));
        router.push('/celebration');
    };

    return (
        <FormProvider {...methods}>
            <PageWrapper protect={false}>
                <h1 className="text-xl font-bold mb-6 text-center font-sans tracking-wide">🎁 Narozeninový kvíz</h1>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">

                    <TextInput
                        label="Tvé jméno"
                        placeholder="Např. Honza"
                        {...methods.register('name', { required: 'Povinné pole' })}
                        classNames={{ label: 'mb-2' }}
                    />

                    <Controller
                        name="birthday"
                        control={methods.control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePickerInput
                                label="Datum narození"
                                locale="cs"
                                value={field.value}
                                onChange={field.onChange}
                                classNames={{ label: 'mb-2' }}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        classNames={{ label: 'font-kablammo animate-pulse tracking-widest font-medium' }}>
                        Pokračovat
                    </Button>
                </form>
            </PageWrapper>
        </FormProvider>
    );
}
