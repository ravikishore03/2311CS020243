import { FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';

const TYPES = ['Event', 'Result', 'Placement'];

export default function FilterBar({ type, onTypeChange }) {
  return (
    <Stack direction="row" spacing={2} mb={2}>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Notification Type</InputLabel>
        <Select
          value={type}
          label="Notification Type"
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <MenuItem value="">All Types</MenuItem>
          {TYPES.map((t) => (
            <MenuItem key={t} value={t}>{t}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}