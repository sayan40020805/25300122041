import { useState } from "react";
import { Container, Typography } from "@mui/material";
import URLInputForm from "../components/UrlInputForm";
import URLCard from "../components/URLCard";
import useLogger from "../hooks/useLogger";

const URLShortenerPage = () => {
  const [urlList, setUrlList] = useState([]);
  const { log } = useLogger();

  const handleShorten = (newUrls) => {
    const updatedUrls = newUrls.map((item) => {
      const currentTime = new Date().getTime();
      const expiryTime = currentTime + item.validity * 60000;

      const shortData = {
        ...item,
        createdAt: new Date(currentTime).toISOString(),
        expiryTime,
        visits: 0,
      };

      // Save to localStorage
      localStorage.setItem(item.shortcode, JSON.stringify(shortData));
      return shortData;
    });

    setUrlList((prev) => [...prev, ...updatedUrls]);
    log("URLs_Shortened", { count: updatedUrls.length });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        URL Shortener
      </Typography>
      <URLInputForm onSubmit={handleShorten} />
      <div style={{ marginTop: "2rem" }}>
        {urlList.map((url, idx) => (
          <URLCard key={idx} data={url} />
        ))}
      </div>
    </Container>
  );
};

export default URLShortenerPage;
