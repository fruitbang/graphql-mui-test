import { Button, FormControl, Box, Container, TextField, Grid } from '@mui/material';
import { usePositionsQuery, useRelationsQuery } from './api/hooks';
import CustomSelect from 'components/CustomSelect';
import { Controller, useForm, Resolver } from 'react-hook-form';

// import {
//     ApplicantIndividualCompanyPosition,
//     ApplicantIndividualCompanyRelation,
// } from './api/types';

/**
 * Типы закомментированы потому, что TypeScript уходит в бесконечную загрузку и мешает этим жить
 */

interface FormData {
    // positionSelect: ApplicantIndividualCompanyPosition | null,
    positionSelect: {
        __typename?: 'ApplicantIndividualCompanyPosition' | undefined;
        id: string;
        name: string;
    } | null;
    // positionSelect: ApplicantIndividualCompanyRelation[] | [],
    relationSelect:
        | {
              __typename?: 'ApplicantIndividualCompanyPosition' | undefined;
              id: string;
              name: string;
          }[]
        | [];
    text: string;
    textarea: string;
}

const resolver: Resolver<FormData> = async (values) => {
    return {
        values,
        errors: {
            positionSelect: values.positionSelect
                ? null
                : { type: 'required', message: 'Position required' },
            relationSelect:
                values.relationSelect.length < 1
                    ? { type: 'required', message: 'Relation required' }
                    : null,
            text: values.text ? null : { type: 'required', message: 'Text required' },
            textarea: !values.textarea
                ? { type: 'required', message: 'Textarea required' }
                : values.textarea.length < 5 || values.textarea.length > 10
                ? {
                      type: 'minMax',
                      message: 'Textarea must be more then 5 and less then 10 characters',
                  }
                : null,
        },
    };
};

export default function Home() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            positionSelect: null,
            relationSelect: [],
            text: '',
            textarea: '',
        },
        resolver,
        mode: 'onTouched',
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const {
        data: relationsData,
        loading: relationsLoading,
        error: relationsError,
    } = useRelationsQuery();

    if (relationsError) {
        throw new Error(relationsError.message);
    }

    const {
        data: positionsData,
        loading: positionsLoading,
        error: positionsError,
    } = usePositionsQuery();

    if (positionsError) {
        throw new Error(positionsError.message);
    }

    const relationsOptions =
        relationsData?.applicantIndividualCompanyRelations?.data ?? [];

    const positionsOptions =
        positionsData?.applicantIndividualCompanyPositions?.data ?? [];

    return (
        <>
            <Container maxWidth="sm" sx={{ height: '100vh', m: '0 auto' }}>
                <Box sx={{ height: '50%', width: '100%', mt: '50%' }}>
                    {relationsLoading || positionsLoading ? (
                        <div>...Loading</div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container justifyContent="flex-end" spacing={1}>
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <Controller
                                            control={control}
                                            name="relationSelect"
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <CustomSelect
                                                    multiple
                                                    options={relationsOptions}
                                                    value={value}
                                                    onChange={onChange}
                                                    label="Relation"
                                                    error={!!errors.relationSelect}
                                                    helperText={
                                                        errors.relationSelect?.message
                                                    }
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <Controller
                                            control={control}
                                            name="positionSelect"
                                            rules={{ required: true }}
                                            render={({ field: { onChange, value } }) => (
                                                <CustomSelect
                                                    options={positionsOptions}
                                                    value={value}
                                                    onChange={onChange}
                                                    label="Position"
                                                    error={!!errors.positionSelect}
                                                    helperText={
                                                        errors.positionSelect?.message
                                                    }
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register('text')}
                                        label="Text"
                                        sx={{ width: '100%' }}
                                        error={!!errors.text}
                                        helperText={errors?.text?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register('textarea')}
                                        label="Textarea"
                                        multiline
                                        rows={4}
                                        sx={{ width: '100%' }}
                                        error={!!errors.textarea}
                                        helperText={errors?.textarea?.message}
                                    />
                                </Grid>
                                <Button type="submit">Submit</Button>
                            </Grid>
                        </form>
                    )}
                </Box>
            </Container>
        </>
    );
}
