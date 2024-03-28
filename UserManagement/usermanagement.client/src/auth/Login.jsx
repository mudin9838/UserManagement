import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Login_BASE_URL } from "../App";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Grid, Snackbar, TextField } from "@mui/material";
import bg from "./bg/signin.svg";
import bgimg from "./bg/backimg.jpg";
import { useForm } from "react-hook-form";
import showToast from "../components/toastify/Toastify";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const vertical = "top";
  const horizontal = "right";
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

  const [open, setOpen] = useState(false);
  const handleChange = (event) => {
    event.persist();
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleFormsubmit = () => {
    setOpen(true);
   // event.preventDefault();

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
          localStorage.setItem("image", res.data.image);
          showToast("success", "Login in successful!");
          navigate("/dashboard");
        } else {
          showToast("error", "Invalid Credential. Verify your userName or password!");
        }
      })
      .catch((e) => {
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      ></Snackbar>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#3b33d5",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Sign In
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit(handleFormsubmit)}
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            fullWidth
                            label="Username"
                            {...register("userName", {
                              onChange: handleChange,
                              required: "Username is required",
                            })}
                            error={Boolean(errors.userName)}
                            helperText={errors.userName?.message}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            {...register("password", {
                              onChange: handleChange,
                              required: "Password is required"
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                            margin="normal"
                            sx={{ mt: 2 }}
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Sign in
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
