import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {  useFormController } from '../../hooks/hooks';
import dayjs from 'dayjs';
type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  setValue?: (name: string, value: string) => void
  name: FieldPath<T>;
  className?: string;
};

const Calendar = <T extends FieldValues>({
  control,
  name,
  className,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const { onChange, value } = field;

  const handleDateChange = (value: dayjs.Dayjs | null)=> {
    onChange(value?.toISOString() ?? '')
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={className}>
        <DatePicker {...field} value={dayjs(value)} onChange={handleDateChange}/>
      </div>
    </LocalizationProvider>
  );
};

export { Calendar };
