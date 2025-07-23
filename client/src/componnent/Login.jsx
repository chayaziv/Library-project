//  import "../styles/SignIn.css"
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { fetchLogin } from "../redux/SubscriptionsSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 0, 0) ",
      b: "rgb(219, 189, 149)",
    },
    background: {
      default: "rgb(219, 189, 149)",
      paper: "rgb(219, 189, 149)",
    },
    text: {
      primary: "rgb(0, 0, 0)",
      secondary: "rgb(0, 0, 0)",
    },
  },
  typography: {
    // fontFamily: 'Georgia, serif',
  },
});

const Login = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    UserCode: "",
  });

  const [errors, setErrors] = useState({
    Email: "",
    Password: "",
    UserCode: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateFields = () => {
    const newErrors = { ...errors };

    if (!formData.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      newErrors.Email = "Please enter a valid email address.";
    }

    if (
      !formData.Password ||
      (!/^([0-9]){4,8}$/.test(formData.Password) &&
        formData.Password.length < 6)
    ) {
      //אותיות מספרים סימונים ומינימום אורך 6
      newErrors.Password = "Password must contain 4-8 numbers.";
    }
    // if (!formData.UserCode || !/^([0-9]){9,9}$/.test(formData.UserCode) && formData.UserCode.length < 9) {
    //   newErrors.UserCode = 'UserCode must contain 9 characters and only numbers.';
    // }
    setErrors(newErrors);

    //מחזיר אם כל הערכים נכונים
    const isValid = Object.keys(newErrors).every((key) => !newErrors[key]);
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        const response = await dispatch(fetchLogin(formData)).unwrap(); // קריאה לפונקציית login

        console.log(response);

        switch (response.status) {
          case 200:
            navigate("/ListP");
            break;
          case 404:
            console.error("not found");
            navigate("/signUp");
            break;
        }
      } catch (error) {
        console.error("Error during login:", error);
        navigate("/signUp");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "background.paper",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* <Typography
          variant="image"
          align="center"
          sx={{height:10}}
          
        >
           {url=('../../images/pp.jpg')}
        </Typography> */}
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "primary.main", marginBottom: 1 }}
        >
          LogIn
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "rgb(0, 0, 0) ", marginBottom: 3 }}
        >
          Welcome back! Please enter your details.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="Email"
            type="email"
            placeholder="Enter your email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.Email}
            onChange={handleChange}
            InputProps={{
              style: {
                color: "rgb(0, 0, 0)",
                backgroundColor: "rgb(219, 189, 149)",
              },
            }}
            InputLabelProps={{
              style: { color: "rgb(0, 0, 0)" },
            }}
            error={!!errors.Email}
            helperText={errors.Email}
          />
          <TextField
            label="UserCode"
            name="UserCode"
            type="UserCode"
            placeholder="Enter your UserCode"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.UserCode}
            onChange={handleChange}
            InputProps={{
              style: {
                color: "rgb(0, 0, 0)",
                backgroundColor: "rgb(219, 189, 149)",
              },
            }}
            InputLabelProps={{
              style: { color: "rgb(0, 0, 0)" },
            }}
            error={!!errors.UserCode}
            helperText={errors.UserCode}
          />
          <TextField
            label="Password"
            name="Password"
            type="Password"
            placeholder="Enter your Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.Password}
            onChange={handleChange}
            InputProps={{
              style: {
                color: "rgb(0, 0, 0)",
                backgroundColor: "rgb(219, 189, 149)",
              },
            }}
            InputLabelProps={{
              style: { color: "rgb(0, 0, 0)" },
            }}
            error={!!errors.Password}
            helperText={
              !formData.Password ||
              (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                formData.Password
              ) &&
                formData.Password.length < 6)
                ? "Password must be at least 6 characters, include uppercase,lowercase,number and special character."
                : ""
            }
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              padding: 1,
              backgroundColor: "primary.b",

              color: "#1a1a1a",
            }}
          >
            Log In
          </Button>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2, color: "text.secondary" }}
        >
          <Link to="/signUp" style={{ color: "primary.main" }}>
            Don't have account?
          </Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
