import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import CountryCard from "../CountryCard/CountryCard";
import {
    getCountries,
    filterFavorites,
    Country,
} from "../../store/slices/countriesSlice";
import styles from "./CountriesList.module.scss";
import { useAppSelector, useAppDispatch, RootState } from "../../store/store.ts";

const CountriesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const countries = useAppSelector((state: RootState) => state.countries.countries);
    const allCountries = useAppSelector((state: RootState) => state.countries.allCountries);
    const isFiltered = useAppSelector((state: RootState) => state.countries.isFiltered);

    useEffect(() => {
        if (allCountries.length === 0) {
            dispatch(getCountries());
        }
    }, [dispatch, allCountries.length]);

    function handleFilterFavorites() {
        dispatch(filterFavorites());
    }

    return (
        <section className={styles.cards}>
            <Button
                variant="contained"
                onClick={handleFilterFavorites}
                className={styles.filter_button}
                sx={{
                    backgroundColor: isFiltered
                        ? "rgba(255, 73, 73, .6)"
                        : "primary",
                }}
            >
                {!isFiltered ? "Показать понравившиеся" : "Показать все"}
            </Button>
            <Box className={styles.list}>
                {countries?.map((c: Country) => {
                    return <CountryCard country={c} key={c.name.common} />;
                })}
            </Box>
        </section>
    );
};

export default CountriesList;
