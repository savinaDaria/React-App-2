import { IconButton as MuiIconButton, IconButtonProps } from '@mui/material';

type Properties = IconButtonProps & {
    onClick?: () => void;
    children?: React.ReactNode;
    className?:string;
};

const IconButton: React.FC<Properties> = ({
    children,
    onClick,
    className = '',
    ...props }) => {
    return <MuiIconButton
        {...props}
        className={className}
        onClick={onClick}
    >{children}</MuiIconButton>;
};

export { IconButton };
