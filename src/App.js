import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme";
import GlobalStyles from "./styles/global";
import {
  Home,
  Login,
  Register,
  AddQuestion,
  OpenedQuestion,
  EdidQuestion,
  EditComment,
} from "./pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddQuestion />} />
        <Route path="/question/:id" element={<OpenedQuestion />} />
        <Route path="/edit/:id" element={<EdidQuestion />} />
        <Route path="/comment/:id" element={<EditComment />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
