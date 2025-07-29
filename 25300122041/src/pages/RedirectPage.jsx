import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Container } from "@mui/material";
import useLogger from "../hooks/useLogger";

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const { log } = useLogger();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(shortcode));
    console.log(navigate);

    if (!data) {
      log("Redirect_Failed", { reason: "Invalid shortcode", shortcode });
      return;
    }

    const now = new Date().getTime();
    if (now > data.expiryTime) {
      log("Redirect_Failed", { reason: "Link expired", shortcode });
      return;
    }

    // Update visit count
    data.visits += 1;
    localStorage.setItem(shortcode, JSON.stringify(data));
    log("Redirect_Success", { shortcode, to: data.longUrl });

    // Redirect
    window.location.href = data.longUrl;
  }, [shortcode, log, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h6" align="center">
        Redirecting...
      </Typography>
    </Container>
  );
};

export default RedirectPage;
