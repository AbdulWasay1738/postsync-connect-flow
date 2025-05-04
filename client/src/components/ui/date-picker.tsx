import { DayPicker as Cal } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function Calendar(props) {
  return (
    <Cal
      className="rounded-md border shadow-sm p-2"
      {...props}
    />
  );
}
