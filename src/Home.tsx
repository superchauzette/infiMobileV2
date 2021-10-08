import { Box, Typography, AppBar, Toolbar, Fab, CssBaseline } from "@mui/material";
import { ImportPictures } from "./ImportPictures";
import { Link } from "react-router-dom";
import { Seances } from "./Seances";
import { styled } from "@mui/material/styles";
import { Add } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useState } from "react";

const FabLink = (props: any) => <Fab component={Link} {...props} />;
const StyledFab = styled(FabLink)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const day = ["Hier", "Aujourd'hui", "Demain"];

export function Home() {
  const [nb, setNb] = useState(0);

  return (
    <>
      <CssBaseline />
      <Swiper
        // virtual
        initialSlide={1}
        spaceBetween={0}
        onSlideChange={(s) => {
          console.log(s.realIndex);
          setNb(s.realIndex);
        }}
      >
        <SwiperSlide key={"1"} virtualIndex={0}>
          <Seances period="Matin" />
          <Seances period="Midi" />
          <Seances period="Après-midi" />
          <Seances period="Soir" />
        </SwiperSlide>
        <SwiperSlide key={"2"} virtualIndex={1}>
          <Seances period="Matin" />
          <Seances period="Midi" />
          <Seances period="Après-midi" />
          <Seances period="Soir" />
        </SwiperSlide>
        <SwiperSlide key={"3"} virtualIndex={2}>
          <Seances period="Matin" />
          <Seances period="Midi" />
          <Seances period="Après-midi" />
          <Seances period="Soir" />
        </SwiperSlide>
      </Swiper>

      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0, zIndex: 1000 }}>
        <Toolbar variant="dense" color="#fff">
          <Typography variant="h6" color="inherit" component="div">
            {day?.[nb]}
          </Typography>
          <StyledFab color="secondary" to="/quotations">
            <Add />
          </StyledFab>

          <Box sx={{ flexGrow: 1 }} />
          <ImportPictures onChange={console.log} />
        </Toolbar>
      </AppBar>
    </>
  );
}
