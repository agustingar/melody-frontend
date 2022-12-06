import "./Profile.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  Paper,
} from "@mui/material";

function Profile() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melody-music-stream-production.up.railway.app/user",
        {
          headers: {
            auth_token: token,
          },
        }
      );
      const data = await response.json();
      const user = data.user;

      setData(user);
    };

    fetchData().catch(console.error);
  }, [token]);

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.delete(
        "https://melody-music-stream-production.up.railway.app/user",
        {
          headers: {
            auth_token: token,
          },
        }
      );
      console.log(data);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-fit ml-[18%] text-white">
      {/* List with the user information */}
      <Container sx={{ width: "100%", p: 4 }}>
        <h1 className="not-italic text-4xl font-black whitespace-nowrap text-ellipsis leading-80 font-mon">
          User Information
        </h1>
        <TableContainer component={Paper} sx={{ p: 4, fontSize: "1.2em" }}>
          <Table>
            <TableBody className="table_edit__profile">
              <TableRow>
                <TableCell>Name: </TableCell>
                <TableCell>{data.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LastName:</TableCell>
                <TableCell> {data.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender: </TableCell>
                <TableCell>{data.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email:</TableCell>{" "}
                <TableCell>{data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date: </TableCell>
                <TableCell>{data.birthday}</TableCell>
              </TableRow>
              <Grid className="buttonProfile">
                <Link to={"/edit"}>
                  <Button variant="contained">Edit User Data</Button>
                </Link>
                <Button
                  variant="outlined"
                  onClick={deleteUser}
                  className="buttonDelete"
                >
                  Delete account
                </Button>
              </Grid>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Profile;
