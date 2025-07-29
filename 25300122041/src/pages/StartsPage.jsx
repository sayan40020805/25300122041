import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Alert } from "@mui/material";
import useLogger from "../hooks/useLogger";

const StatsPage = () => {
  const { shortcode } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const { log } = useLogger();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(shortcode));
    if (!data) {
      setError("Invalid shortcode.");
      log("Stats_Fetch_Failed", { shortcode, reason: "Not found" });
      return;
    }

    const now = new Date().getTime();
    const remainingTime = Math.max(
      0,
      Math.floor((data.expiryTime - now) / 60000)
    );

    setStats({
      ...data,
      remainingTime,
    });

    log("Stats_Fetched", { shortcode });
  }, [shortcode, log]);

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Stats for: {shortcode}
        </Typography>
        <Box mb={2}>
          <Typography>
            <strong>Original URL:</strong> {stats?.longUrl}
          </Typography>
          <Typography>
            <strong>Visits:</strong> {stats?.visits}
          </Typography>
          <Typography>
            <strong>Created At:</strong> {stats?.createdAt}
          </Typography>
          <Typography>
            <strong>Time Left:</strong> {stats?.remainingTime} mins
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default StatsPage;
