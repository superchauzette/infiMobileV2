import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  ListItemIcon,
  Checkbox,
  Fab,
} from "@mui/material";
import { SearchField } from "./ui/SearchField";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Add, ArrowBack } from "@mui/icons-material";

export function Quotations() {
  const quotations = [
    {
      name: "PSC",
      patient: "Pierre Montoubou",
      keyLetter: {
        id: "ami",
        label: "ami",
        price: 5.1,
        priceDOM: 4.3,
      },
      coefficient: {
        id: "1.2",
        value: 1.2,
      },
    },
    {
      name: "Injection",
      patient: "Simon Dubois",
      keyLetter: {
        id: "ami",
        label: "ami",
        price: 5.1,
        priceDOM: 4.3,
      },
      coefficient: {
        id: "2",
        value: 2,
      },
    },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar variant="dense" color="#fff">
          <IconButton color="inherit" component={Link} to="/">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="h2" ml={2}>
            Selectionner un traitement
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={7}>
        <SearchField />

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Recents" />
              <Tab label="Liste des cotations" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {quotations.map((quotation, index) => (
                <SeanceItem
                  key={quotation.name + index}
                  patient={quotation.patient}
                  careNames={[
                    `${quotation.name} (${quotation.keyLetter.label} ${quotation.coefficient.value})`,
                    "Injection sous cutanée (ami 3)",
                  ]}
                />
              ))}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <List>
              {quotations.map((quotation) => (
                <QuotationItem key={quotation.name} quotation={quotation} />
              ))}
            </List>
            <Fab
              variant="extended"
              size="small"
              color="secondary"
              component={Link}
              to="/patients"
              sx={{ position: "fixed", bottom: 20, right: "50%", transform: "translate(50%)" }}
            >
              <Add /> Ajouter
            </Fab>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}

function QuotationItem({ quotation }: any) {
  return (
    <ListItem key={quotation.name} disablePadding component="label">
      <ListItemIcon>
        <Checkbox edge="start" tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={`${quotation.name} (${quotation.keyLetter.label} ${quotation.coefficient.value})`} />
    </ListItem>
  );
}

function SeanceItem({ bgcolor = "secondary.main", patient, careNames, date }: any) {
  return (
    <ListItem
      to="/"
      component={Link}
      alignItems="flex-start"
      secondaryAction={<Typography color="text.primary">{date}</Typography>}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor }}>+</Avatar>
      </ListItemAvatar>
      <ListItemText
        sx={{ color: "text.primary" }}
        primary={patient}
        secondary={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {careNames?.map((name: string) => (
              <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.secondary">
                {name}
              </Typography>
            ))}
          </Box>
        }
      />
    </ListItem>
  );
}

function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
