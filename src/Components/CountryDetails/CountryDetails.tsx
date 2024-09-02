// CountryDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Country } from '../../store/slices/countriesSlice'
import { Button, Typography, Box } from '@mui/material';
import styles from './CountryDetails.module.scss';

const CountryDetails: React.FC = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const country = useSelector((state: RootState) => state.countries.allCountries.find((c: Country) => c.name.common === name));

    function handleBackClick() {
        navigate('/');
    }

    return (
        <Box className={styles.country_details}>
            <Button variant="contained" onClick={handleBackClick}>Назад к списку</Button>
            <Typography variant="h4">{country.name.common}</Typography>
            <img src={country.flags.svg} alt={`${country.name.common} flag`} style={{ width: '100px' }} />
            <Typography>Столица: {country.capital}</Typography>
            <Typography>Регион: {country.region}</Typography>
            <Typography>Население: {country.population}</Typography>
        </Box>
    );
};

export default CountryDetails;
