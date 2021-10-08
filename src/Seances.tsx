import { Box, Typography, ListSubheader } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export function Seances({ period }: { period: string }) {
  return (
    <Box>
      <List sx={{ width: "100%", pt: 0, bgcolor: "background.paper" }}>
        <ListSubheader sx={{ bgcolor: "common.black", color: "secondary.main" }}>{period}</ListSubheader>

        <SeanceItem
          initialNurse="RS"
          patient="Paul Boulanger"
          careNames={["PSC", "Injection sous cutanée"]}
          date="8h22"
        />
        <Divider />
        <SeanceItem initialNurse="MP" bgcolor="#468b38" patient="Jack Russel" careNames={["Injection"]} date="9h32" />
        <Divider />
        <SeanceItem initialNurse="RS" patient="Sandra Adams" careNames={["Pansement"]} date="10h03" />
      </List>
    </Box>
  );
}

function SeanceItem({ initialNurse, bgcolor = "#e4c332", patient, careNames, date }: any) {
  return (
    <ListItem alignItems="flex-start" secondaryAction={<Typography color="text.primary">{date}</Typography>}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor }}>{initialNurse}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={patient}
        secondary={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {careNames?.map((name: string) => (
              <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                {name}
              </Typography>
            ))}
          </Box>
        }
      />
    </ListItem>
  );
}
