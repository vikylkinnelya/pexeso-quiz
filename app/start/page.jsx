'use client';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { TextInput, Button, Container } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useRouter } from 'next/navigation';
import 'dayjs/locale/cs';

export default function QuizStartPage() {
    const methods = useForm();
    const router = useRouter();

    const onSubmit = (data) => {
        sessionStorage.setItem('quizUser', JSON.stringify(data));
        router.push('/celebration');
    };

    return (
        <FormProvider {...methods}>
            <Container size="xs" className="min-h-screen flex flex-col items-center justify-center   text-center px-4">
                <h1 className="text-xl font-bold mb-6 text-center font-sans tracking-wide">🎁 Narozeninový kvíz</h1>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                    
                    <TextInput
                        label="Tvé jméno"
                        placeholder="Např. Honza"
                        {...methods.register('name', { required: true })}
                    />

                    <Controller
                        name="birthday"
                        control={methods.control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DateInput
                                label="Datum narození"
                                locale="cs"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Button type="submit" fullWidth>
                        Pokračovat
                    </Button>
                </form>
            </Container>
        </FormProvider>
    );
}
