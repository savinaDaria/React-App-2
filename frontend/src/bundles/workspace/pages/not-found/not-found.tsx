
import { Grid, Typography } from '~/bundles/common/components/components.js';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '~/bundles/common/enums/enums';

const NotFoundPage: React.FC = () => {
    return (
        <Grid container className={styles.pageContainer}>
            <Grid container item className={styles.text}>
                <Typography variant="body1" className={styles.description}>
                    The page you are looking for can’t be found.
                </Typography>
                <Typography variant="h1" className={styles.code}>
                    404
                </Typography>
            </Grid>

            <Grid container item className={styles.linkWrapper}>
                <NavLink className={styles.link} to={AppRoute.ROOT}>
                    Return to Main
                </NavLink>
            </Grid>
        </Grid>
    );
};

export { NotFoundPage };
