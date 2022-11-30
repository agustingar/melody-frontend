import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import IconButton from "@mui/material/IconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useNavigate } from "react-router-dom";

import "./search.css";

export default function GenreImageList() {
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    console.log(e.currentTarget.dataset);
    const map = e.currentTarget.dataset;
    const obj = { ...map };

    switch (obj.testId) {
      case "Made for you":
        navigate("/songs");
        break;
      case "POP":
        navigate("/pop");
        break;
      case "Rock":
        navigate("/rock");
        break;
      case "Samba":
        navigate("/samba");
        break;
      case "Alternative":
        navigate("/alternative");
        break;
      case "Classic songs":
        navigate("/classic");
        break;
      default:
        navigate("/search");
    }
  };

  return (
    <ImageList sx={{ width: 500, height: 500 }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.title}`}
                data-test-id={item.title}
                onClick={(e) => handleNavigate(e)}
              >
                <PlayCircleIcon sx={{ fontSize: "1.5em" }} />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669772153/melody/genders/madeyou_skfzwe.png",
    title: "Made for you",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669771786/melody/genders/Pop_qyy0gz.png",
    title: "POP",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669771778/melody/genders/Rock_a6g2rs.png",
    title: "Rock",
    author: "@helloimnik",
  },
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669829158/melody/genders/Classic_as6ooe.png",
    title: "Classic songs",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669771793/melody/genders/Samba_ivuiw0.png",
    title: "Samba",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669771800/melody/genders/Alternative_pbsp23.png",
    title: "Alternative",
    author: "@nolanissac",
    cols: 2,
  },

  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669800416/melody/genders/acoustic_kwi5xg.png",
    title: "Acoustic",
    author: "@tjdragotta",
  },
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669800617/melody/genders/latino_i4e1ld.png",
    title: "Latino",
    author: "@katie_wasserman",
  },
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669802956/melody/genders/Electronic_foxhn7.png",
    title: "Electronic",
    author: "@southside_customs",
    cols: 2,
  },
  {
    img: "https://res.cloudinary.com/dzfouunnx/image/upload/v1669802853/melody/genders/Rap_mgnnln.png",
    title: "RAP",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
];
