import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { SearchField } from "./ui/SearchField";
import { StickyTree } from "react-virtualized-sticky-tree";
import { groupBy, uniq, sortBy } from "lodash";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export function Patients() {
  const patients = [
    { id: 1, firstname: "Paul", lastname: "Murond" },
    { id: 2, firstname: "Martine", lastname: "Juroux" },
    { id: 3, firstname: "Alain", lastname: "Pierre" },
    { id: 4, firstname: "Michel", lastname: "Duboit" },
    { id: 5, firstname: "Pierre", lastname: "Patin" },
  ] as any[];

  return (
    <Box height="100vh">
      <AppBar position="fixed" color="primary">
        <Toolbar variant="dense" color="#fff">
          <IconButton color="inherit" component={Link} to="/quotations">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="h2" ml={2}>
            Selectionner un traitement
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={7} px={2} pt={1} sx={{ height: "calc(100% - 56px)" }}>
        <SearchField placeholder="Rechercher un patient" />
        <Box p={1} />
        <SectionList
          data={patients}
          transformBy={(patient) => patient.firstname.substring(0, 1).toUpperCase()}
          getDisplayRow={(patient) => `${patient?.firstname} ${patient?.lastname}`}
        />
      </Box>
    </Box>
  );
}

let i = 0;

function SectionList<T extends { id: string }>({
  data,
  transformBy,
  getDisplayRow,
  ...props
}: {
  data?: T[];
  transformBy: (d: T) => string;
  getDisplayRow: (d: T) => string;
}) {
  const tree = useMemo(() => {
    const levelRoot = {
      root: {
        children: [...(sortBy(uniq(data?.map(transformBy))) || [])],
        depth: 0,
      },
    };

    const level1 = Object.entries(groupBy(data, transformBy))
      .map(([key, value]) => ({
        name: key,
        children: (value as T[]).map((v: T) => v.id),
        depth: 1,
      }))
      ?.reduce((a, b) => ({ ...a, [b.name]: b }), {});

    const level2 = data?.reduce((a: T, b: T) => {
      return {
        ...a,
        [String(b.id)]: { ...b, name: getDisplayRow(b), depth: 2 },
      };
    }, {} as any);

    const _tree: any = {
      ...levelRoot,
      ...level1,
      ...level2,
    };

    return _tree;
  }, [data, transformBy, getDisplayRow]);

  const getChildren = (id: any) => {
    if (tree[id].children) {
      return tree[id].children.map((id: any) => ({
        id,
        height: 30,
        isSticky: true,
        zIndex: 30 - tree[id].depth,
      }));
    }
  };

  return (
    <StickyTree
      root={{ id: "root", height: 30 } as any}
      height={window.innerHeight - 170}
      getChildren={getChildren}
      rowRenderer={({ id, style, nodeInfo }: any) => {
        const node = tree[id];
        i++;

        return (
          <div
            key={id + i + "" + Math.random()}
            style={{
              ...style,
              //  backgroundColor: "#f3f3f3",
              marginLeft: nodeInfo.depth === 2 ? "25px" : 0,
              fontWeight: nodeInfo.depth === 1 ? 900 : 500,
            }}
          >
            <Link to={"/"}>{node.name}</Link>
          </div>
        );
      }}
      renderRoot={false}
      overscanRowCount={20}
      {...props}
    />
  );
}
