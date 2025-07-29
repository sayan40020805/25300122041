import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const URLCard = ({ data }) => {
  const navigate = useNavigate();
  const shortUrl = `http://localhost:3000/${data.shortcode}`;

  const handleStats = () => {
    navigate(`/stats/${data.shortcode}`);
  };

  return (
    <Card sx={{ mb: 2, backgroundColor: "#f4f4f4" }}>
      <CardContent>
        <Typography variant="h6">Original URL:</Typography>
        <Typography variant="body2" gutterBottom>{data.longUrl}</Typography>

        <Typography variant="h6">Short URL:</Typography>
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
          {shortUrl}
        </a>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="body2">
            Valid for: {data.validity} minutes
          </Typography>
          <Button variant="outlined" onClick={handleStats}>
            View Stats
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default URLCard;
