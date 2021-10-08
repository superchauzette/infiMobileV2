import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { Patients } from "./Patients";
import { Quotations } from "./Quotations";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#000",
    // },
    secondary: {
      main: "#f72585",
    },
    // background: {
    //   paper: "#232323",
    //   default: "#232323",
    // },
    // text: {
    //   primary: "#fff",
    //   secondary: "#929292",
    // },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/quotations">
            <Quotations />
          </Route>
          <Route path="/patients">
            <Patients />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
