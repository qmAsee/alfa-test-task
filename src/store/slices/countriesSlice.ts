import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Country {
    capital: string,
    region: string,
    population: number,

    name: {
      common: string;
      official?: string;
    },
    flags: {
        svg: string;
    }
}

interface CountriesState {
    countries: Country[];
    allCountries: Country[];
    likedCountries: string[];
    status: string;
    error: string | null;
    isFiltered: boolean;
}

export const getCountries = createAsyncThunk<Country[], void, {rejectValue: string}>(
    "countries/getCountries",
    async (_, { rejectWithValue }) => {
        
        try {
            const response = await axios.get("https://restcountries.com/v3.1/all");

            return response.data;  
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

const initialState: CountriesState = {
    countries: [],
    allCountries: [],
    likedCountries: [],
    status: "",
    error: null,
    isFiltered: false,
};

const countriesSlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        deleteCountry(state, action: PayloadAction<string>) {
            state.countries = state.countries.filter((el) => el.name.common !== action.payload);

            state.likedCountries = state.likedCountries.filter(
                name => name !== action.payload
            );

            state.allCountries = state.allCountries.filter((el) => el.name.common!== action.payload);
        },

        toggleLikeCountry(state, action: PayloadAction<string>) {
            if (state.likedCountries.includes(action.payload)) {
              state.likedCountries = state.likedCountries.filter(
                name => name !== action.payload
              );
            } else {
              state.likedCountries.push(action.payload);
            }
          },
          filterFavorites(state) {
            if (!state.isFiltered) {
                state.isFiltered = true;

                if (state.allCountries.length === 0) {
                    state.allCountries = state.countries;
                }
                state.countries = state.countries.filter((el) => state.likedCountries.includes(el.name.common));
            } else {
                state.isFiltered = false;
                state.countries = state.allCountries;
            }
          }
    },
    extraReducers: (builder) => {
        builder.addCase(getCountries.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getCountries.fulfilled, (state, action:  PayloadAction<Country[]>) => {
            state.status = "resolved";
            console.log(action.payload);
            state.countries = action.payload;
            state.allCountries = action.payload;
        });
        builder.addCase(getCountries.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.status = "rejected";
            state.error = action.payload || null;
        });
    },
});

export const { deleteCountry, toggleLikeCountry, filterFavorites } = countriesSlice.actions;
export default countriesSlice.reducer;
