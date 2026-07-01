import { Button, Box, Typography } from "@mui/material";

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={2}>
      <Button
        variant="outlined"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <Typography>
        Page {page} of {totalPages}
      </Typography>
      <Button
        variant="outlined"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </Box>
  );
}

export default Pagination;