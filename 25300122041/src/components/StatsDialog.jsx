import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

const StatsDialog = ({ open, onClose, stats }) => {
  if (!stats) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>URL Statistics</DialogTitle>
      <DialogContent>
        <Typography>
          <strong>Original URL:</strong> {stats.longUrl}
        </Typography>
        <Typography>
          <strong>Shortcode:</strong> {stats.shortcode}
        </Typography>
        <Typography>
          <strong>Visits:</strong> {stats.visits}
        </Typography>
        <Typography>
          <strong>Created At:</strong> {stats.createdAt}
        </Typography>
        <Typography>
          <strong>Expires In:</strong> {stats.remainingTime} minutes
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatsDialog;
