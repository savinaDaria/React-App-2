import { Chip as MUIChip, ChipProps } from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = ChipProps & {
    label: string;
    className?: string;
};

const Chip: React.FC<Properties> = ({ label, className = '', ...props }) => {

    return (
        <MUIChip
            {...props}
            className={getValidClassNames(styles.chip, className)}
            label={label}
        />
    );
};

export { Chip };
