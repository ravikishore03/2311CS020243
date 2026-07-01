import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function TopNSelector({ n, onChange, options = [5, 10, 20] }) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel>Show top</InputLabel>
      <Select value={n} label="Show top" onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <MenuItem key={o} value={o}>{o}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}