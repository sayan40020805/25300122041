import { useState } from "react";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { generateShortCode } from "../utils/shortCodeGenerator";
import { useLogger } from "../context/LoggerContext";

const URLInputForm = ({ onSubmit }) => {
  const [inputs, setInputs] = useState([
    { longUrl: "", validity: "", shortcode: "" },
  ]);
  const { logEvent } = useLogger();

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = () => {
    const formattedInputs = inputs.map((input) => ({
      ...input,
      validity: input.validity ? parseInt(input.validity) : 30,
      shortcode: input.shortcode || generateShortCode(),
    }));

    logEvent("Submit_URLs", { count: formattedInputs.length });
    onSubmit(formattedInputs);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Shorten URLs
      </Typography>
      {inputs.map((input, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} md={5}>
            <TextField
              label="Long URL"
              fullWidth
              required
              value={input.longUrl}
              onChange={(e) =>
                handleInputChange(index, "longUrl", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Validity (mins)"
              fullWidth
              type="number"
              value={input.validity}
              onChange={(e) =>
                handleInputChange(index, "validity", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              value={input.shortcode}
              onChange={(e) =>
                handleInputChange(index, "shortcode", e.target.value)
              }
            />
          </Grid>
        </Grid>
      ))}
      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          onClick={addInput}
          disabled={inputs.length >= 5}
        >
          Add Another
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Shorten
        </Button>
      </Box>
    </Paper>
  );
};

export default URLInputForm;
