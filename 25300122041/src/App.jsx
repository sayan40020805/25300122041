import AppRouter from "./routes/AppRouter";
import LoggerProvider from "./context/LoggerProvider"; // ✅ CORRECT
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <LoggerProvider>
      <CssBaseline />
      <AppRouter />
    </LoggerProvider>
  );
}

export default App;
