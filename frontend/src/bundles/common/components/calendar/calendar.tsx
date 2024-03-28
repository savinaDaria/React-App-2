import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SelectChangeEvent } from '@mui/material';
// import styles from './styles.module.scss';

type Properties = {
    label: string;
    className?: string;
};

const Calendar: React.FC<Properties> = ({ label, className=''  }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={className}>
            <DatePicker label={label} name="startDate"  />
          </div>
        </LocalizationProvider>
      );
};

export { Calendar };
