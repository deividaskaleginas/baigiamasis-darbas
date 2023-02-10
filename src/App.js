import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme";
import GlobalStyles from "./styles/global";
import { Home, Login, Register } from "./pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
