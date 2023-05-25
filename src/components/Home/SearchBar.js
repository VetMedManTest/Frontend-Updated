import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'

const validationSchema = yup.object({
    search: yup
        .string('Enter your search query')
        .required('Please Enter product name'),
});

const SearchBar = () => {

    const navigate = useNavigate();

    const onSubmit = (values, actions) => {
        const { search } = values;
        if (search.trim()) {
            navigate(`/search/${search}`);
        } else {
            navigate('/');
        }
        actions.resetForm();
        values.search = ''; 
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },

        validationSchema: validationSchema,
        onSubmit
    });

    return (
        <form onSubmit={handleSubmit} style={{ width: '50%' }} autoComplete="off">
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: '30px',
                marginLeft: '50%',
                border: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                borderRadius: '25px',
                overflow: 'hidden'
            }}>
                <InputBase
                    sx={{
                        bgcolor: 'white',
                        padding: '10px',
                    }}
                    fullWidth={true}
                    id="search"
                    name="search"
                    label="search"
                    placeholder='Enter product Name'
                    value={values.search}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.search && Boolean(errors.search)}
                    inputProps={{
                        style: {
                          marginLeft: '40px',
                          fontSize: '15px',
                        },
                    }}
                />

                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                        backgroundColor: '#3CF300',
                        color: 'black',
                        minWidth: '80px',
                        borderRadius: 0,
                        '&:hover': {
                            backgroundColor: 'green', 
                            color:'white'
                          },
                    }}
                >
                    <AiOutlineSearch style={{fontSize: '25px'}}/>
                </Button>
            </Box>
            <Box component='span' sx={{ color: 'red' }}>{touched.search && errors.search}</Box>
        </form>

    );
};

export default SearchBar;
