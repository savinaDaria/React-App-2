import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useFormController } from '../../hooks/hooks';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  className?: string;
};

const Calendar= <T extends FieldValues>({
  control,
  name,
  className,
}: Properties<T>): JSX.Element =>  {
  const { field } = useFormController({ name, control });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={className}>
        <DatePicker {...field} />
      </div>
    </LocalizationProvider>
  );
};

export { Calendar };
