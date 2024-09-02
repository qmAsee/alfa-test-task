import styles from './CountryCard.module.scss'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCountry, toggleLikeCountry, Country } from '../../store/slices/countriesSlice'
import { Card, CardMedia, Typography } from "@mui/material";
import { FavoriteBorder, Favorite, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface CountryCardProps {
    country: Country;
  }

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const likedCountries = useSelector((state: RootState) => state.countries.likedCountries);
    const isLiked = likedCountries.includes(country.name.common);
     
     function handleDeleteCard(e: React.MouseEvent<SVGSVGElement>) {
        e.stopPropagation();
        dispatch(deleteCountry(country.name.common));
     }

     function handleToggleLike(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        dispatch(toggleLikeCountry(country.name.common));
      }

     function handleCardClick() {
        navigate(`/country/${country.name.common}`);
    }

    return (
        <Card className={styles.card} onClick={handleCardClick} sx={{ width: 180 }}>
            <CardMedia
                sx={{ height: 120, width: '100%', objectFit: 'cover' }}
                image={country.flags.svg}
                title={country.name.common}
            />
            <div className={styles.name_wrapper}>
                <Typography className={styles.name} variant="h3">{country.name.common}</Typography>
            </div>
            <div className={styles.buttons_box}>
                <div onClick={handleToggleLike}>
                    {
                        isLiked ? <Favorite className={styles.like} sx={{ color: 'red'}} /> : <FavoriteBorder className={styles.like} sx={{cursor: 'pointer'}} />
                    }
                </div>
                <Delete className={styles.delete} sx={{cursor: 'pointer'}} onClick={handleDeleteCard}/>
            </div>
        </Card>
    );
};

export default CountryCard;
