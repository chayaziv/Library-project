import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import {fetchSignup} from "../redux/SubscriptionsSlice";
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import { useSelector } from "react-redux";
//import reducer from '../redux/SubscriptionsSlice'


const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(0, 0, 0)', 
        },
        background: {
            default: 'rgb(0, 0, 0)',
            paper: 'rgb(219, 189, 149)' ,
        },
        text: {
            primary: 'rgb(0, 0, 0)',
            secondary:'rgb(219, 189, 149)' ,
        },
    },
    typography: {
      
      //  fontFamily: 'Georgia, serif',
    },
});

const SignUp = () => {
    //console.log(useSelector((state) => state.user.user));
    //const u = useSelector((state) => state.user.user.id)
    //console.log(u);
   


    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Password: "",
        Phone: "",
        UserCode: "",
        Id:"0"
    });

    const [errors, setErrors] = useState({
        Name: "",
        Email: "",
        Password: "",
        Phone: "",
        UserCode: "",
        Id:""
    });

    // const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageFileError, setImageFileError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // const handleFileChange = (e) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setImageFile(file);
    //         setImageFileError('');
    //     } else {
    //         setImageFileError('Please select a valid file.');
    //     }
    // };

    const validateFields = () => {
        const newErrors = { ...errors };

        if (!formData.Name || !/^[a-zA-Z\s]{2,}$/.test(formData.Name)) {
            newErrors.Name = 'Name must contain at least 2 characters and only letters and spaces.';
        }

        if (!formData.Email || !/^\S+@\S+\.\S+$/.test(formData.Email)) {
            newErrors.Email = 'Invalid Email address';
        }

        if (!formData.Password || !/^([0-9]){4,8}$/.test(formData.Password) && formData.Password.length < 6) {//אותיות מספרים סימונים ומינימום אורך 6
            newErrors.Password = 'Password must contain 4-8 numbers.';
          }
        if (!formData.Phone || !/^[0-9]{9,10}$/.test(formData.Phone)) {
            newErrors.Phone = 'Phone must contain 9 or 10 characters and only numbers.';
        }
        if (!formData.UserCode || !/^([0-9]){9,9}$/.test(formData.UserCode) && formData.UserCode.length < 9) {
            newErrors.UserCode = 'UserCode must contain 9 characters and only numbers.';
        }

        setErrors(newErrors);

        const isValid = (Object.keys(newErrors))
            .every((key) => !newErrors[key]);
        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFields()) {
            try {
                const ans = await dispatch(fetchSignup(formData)).unwrap();
               
                const status = ans.status;
                switch (status) {
                    case 201://לא מצא לקוח כזה כבר קיים
                        // const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
                        // const file = fileInput?.files?.[0];
                        // if (file) {
                        //     const uploadResponse = await dispatch(
                        //         fetchUploafImage({ user: ans.data, file })
                        //     ).unwrap();
                        // } else {
                        //     console.warn("No file selected for upload.");
                        // }
                        navigate("/ListP");
                        break;
                    case 400:
                        // setErrors((prevError) => ({
                        //     ...prevError,
                        //     Email: "User with this Email already exists. Please use a different Email.",
                        // }));
                        
                        alert("404/קיים")
                        console.error("404")
                        break;
                }
            }
             catch (err) {
               
             }
        }
    }

    return (
        
        <ThemeProvider theme={theme}>
           
            <Container
                maxWidth="xs"
                sx={{
                    backgroundColor: 'background.paper',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ color: 'primary.main', marginBottom: 1 }}
                >
                    SignUp
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="Name"
                        placeholder="Enter your Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.Name}
                        onChange={handleChange}
                        InputProps={{
                            style: { color: 'rgb(0, 0, 0)', backgroundColor:'rgb(219, 189, 149)' },
                        }}
                        InputLabelProps={{
                            style: { color: 'rgb(0, 0, 0)' },
                        }}
                        error={!!errors.Name}
                        helperText={errors.Name}
                    />

                    <TextField
                        label="Password"
                        type="Password"
                        name="Password"
                        placeholder="Enter your Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.Password}
                        onChange={handleChange}
                        InputProps={{
                            style: { color: 'rgb(0, 0, 0)', backgroundColor: 'rgb(219, 189, 149)' },
                        }}
                        InputLabelProps={{
                            style: { color: 'rgb(0, 0, 0)' },
                        }}
                        error={!!errors.Password}
                        helperText={errors.Password}
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
                            style: { color: 'rgb(0, 0, 0)', backgroundColor:'rgb(219, 189, 149)'  },
                        }}
                        InputLabelProps={{
                            style: { color: 'rgb(0, 0, 0)' },
                        }}
                        error={!!errors.UserCode}

                        helperText={errors.UserCode}


                    />
                    <TextField
                        label="Phone"
                        type="Phone"
                        name="Phone"
                        placeholder="Enter your Phone"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.Phone}
                        onChange={handleChange}
                        InputProps={{
                            style: { color:'rgb(0, 0, 0)', backgroundColor: 'rgb(219, 189, 149)'  },
                        }}
                        InputLabelProps={{
                            style: { color: 'rgb(0, 0, 0)' },
                        }}
                        error={!!errors.Phone}
                        helperText={errors.Phone}
                    />
                    <TextField
                        label="Email"
                        name="Email"
                        type="Email"
                        placeholder="Enter your Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.Email}
                        onChange={handleChange}
                        InputProps={{
                            style: { color: 'rgb(0, 0, 0)', backgroundColor:'rgb(219, 189, 149)'  },
                        }}
                        InputLabelProps={{
                            style: { color: 'rgb(0, 0, 0)' },
                        }}
                        error={!!errors.Email}
                        helperText={errors.Email}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            marginTop: 2,
                            padding: 1,
                            backgroundColor: 'rgb(219, 189, 149)' ,
                            
                            color: '#1a1a1a',
                        }}
                    >
                        SignUp
                    </Button>
                </Box>
                 {/* <Link to="/ListP" style={{ color: 'primary.main' }} >
           
          </Link>
                 */}
            </Container>
        </ThemeProvider>
    )
}

export default SignUp;