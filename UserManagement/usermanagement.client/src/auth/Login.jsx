import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from "axios";
import Swal from "sweetalert2";
import { Login_BASE_URL } from "../App";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        UMS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    var isAuth = localStorage.getItem("auth");

    if (isAuth !== null) {
      navigate("/dashboard", { replace: true });
    }
  }, []);
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });
  const handleChange = (event) => {
    event.persist();
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleFormsubmit = (event) => {
    event.preventDefault();

    let data = {
      UserName: inputs.userName,
      Password: inputs.password,
    };

    axios
      .post(Login_BASE_URL + "/api/Auth/Login", data)
      .then((res) => {
        if (res) {
          localStorage.setItem("auth", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("userName", res.data.name);
          localStorage.setItem("roles", res.data.roles);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/dashboard");
        } else {
          Swal.fire({
            title: "Warning !",
            icon: "warning",
            text: "Invalid Credential. Verify your userName or password",
            button: "Ok!",
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "Warning !",
          icon: "warning",
          text: e,
          button: "Ok!",
        });
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box 
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <ValidatorForm
                onSubmit={handleFormsubmit}
            >
                <TextValidator
                 margin="normal"
                    label="userName"
                    onChange={handleChange}
                    name="userName"
                    value={inputs.userName}
                    autoComplete="userName"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    sx={{
                        width: 300,
                      }}
                />
                <br />
                <TextValidator
                margin="normal"
                    label="Password"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    fullWidth
                    value={inputs.password}
                    autoComplete="current-password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                   >Sign In
                </Button>
            </ValidatorForm>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
