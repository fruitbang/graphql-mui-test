import React, {
    ChangeEvent,
    forwardRef,
    useContext,
    createContext,
    useState,
    MouseEventHandler,
} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import {
    ApplicantIndividualCompanyPosition,
    ApplicantIndividualCompanyRelation,
} from '../pages/api/types';

type CustomSelectValue =
    | ApplicantIndividualCompanyPosition
    | ApplicantIndividualCompanyRelation;

interface CustomSelectProps {
    value: CustomSelectValue | CustomSelectValue[] | null;
    multiple?: boolean | undefined;
    options: CustomSelectValue[];
    onChange: (value: CustomSelectValue | CustomSelectValue[] | null) => void;
    label: string;
    error: boolean;
    helperText: string | undefined;
}

const ListboxContext = createContext<MouseEventHandler<HTMLButtonElement> | undefined>(
    undefined
);

const Listbox = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLElement>>(
    (props, ref) => {
        const { children, ...other } = props;
        const handleClickOpen = useContext(ListboxContext);
        return (
            <ul ref={ref} {...other}>
                <>
                    {children}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handleClickOpen}>Add</Button>
                    </Box>
                </>
            </ul>
        );
    }
);

const CustomSelect = ({
    multiple = undefined,
    options,
    value,
    onChange,
    label,
    error,
    helperText,
}: CustomSelectProps) => {
    const [filterValue, setFilterValue] = useState('');

    const [newOptions, setNewOptions] = useState(options);

    const [newOptionName, setNewOptionName] = useState('');

    const handleOnChangeNewOptionName = ({
        target,
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setNewOptionName(target.value);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnAddNewOption = () => {
        const newOption = {
            name: newOptionName,
            id: String(newOptions.length + 1),
        };
        setNewOptions((options) => {
            return [...options, newOption];
        });
        setNewOptionName('');
        onChange(multiple ? [...(value as CustomSelectValue[]), newOption] : newOption);
        handleClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new {label.toLowerCase()}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={`${label} name`}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newOptionName}
                        onChange={handleOnChangeNewOptionName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleOnAddNewOption}>Add</Button>
                </DialogActions>
            </Dialog>
            <ListboxContext.Provider value={handleClickOpen}>
                <Autocomplete
                    multiple={multiple}
                    options={newOptions}
                    value={value}
                    inputValue={filterValue}
                    onInputChange={(_, value, reason) =>
                        multiple
                            ? reason !== 'reset' && setFilterValue(value)
                            : setFilterValue(value)
                    }
                    disableCloseOnSelect={multiple}
                    onChange={(event, newValue) => {
                        onChange(newValue);
                    }}
                    getOptionLabel={(option) => `${option.name} id:${option.id}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                label={label}
                                error={error}
                                helperText={helperText}
                            />
                        );
                    }}
                    ListboxComponent={Listbox}
                    noOptionsText={
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleClickOpen}>Add</Button>
                        </Box>
                    }
                />
            </ListboxContext.Provider>
        </>
    );
};

export default CustomSelect;
