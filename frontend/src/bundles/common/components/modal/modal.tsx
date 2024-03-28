import { Modal as MUIModal,ModalProps } from '@mui/material';


type Properties = ModalProps & {
    headerLabel: string;
    className?: string;
    onClose: () => void;
};

const Modal: React.FC<Properties> = ({
    className,
    onClose,
    children,
    ...props
}) => (
    <MUIModal {...props} onClose={onClose} className={className}>
        {children}
    </MUIModal>
);

export { Modal };
