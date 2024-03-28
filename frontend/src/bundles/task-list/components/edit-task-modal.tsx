import {  Grid, Modal, Typography } from '~/bundles/common/components/components';
import styles from './styles.module.scss';

type Properties = {
    label: string;
    isOpen: boolean;
    onClose: () => void;
};

const EditTaskModal: React.FC<Properties> = ({
    label,
    isOpen,
    onClose,
}) => {
    return (
        <Modal
            headerLabel={label}
            open={isOpen}
            onClose={onClose}
            className={styles.modal}
        >
            <Grid container className={styles.modalContainer}>
                <Typography variant="h6" align="center">
                    Are you sure you want to confirm this action?
                </Typography>
                <Grid container item className={styles.buttonWrapper}>
                   
                </Grid>
            </Grid>
        </Modal>
    );
};

export { EditTaskModal };
