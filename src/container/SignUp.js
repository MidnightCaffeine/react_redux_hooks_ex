import React from "react";
import { useHistory } from "react-router-dom";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  Paper,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./styles.scss";
const countryInfo = require("../raw/country_list.json");
// React Component SignUp : Display a signup page and handles user signup validation
const SignUp = () => {
  const history = useHistory();
  const [userInfo, setuserInfo] = React.useState({
    password: "",
    showPassword: false,
    confirmPass: "",
    name: "",
    userId: "",
    country: "",
  });

  const handleClickShowPassword = () => {
    setuserInfo({
      ...userInfo,
      showPassword: !userInfo.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signUp = () => {
    history.push(`/`);
  };

  return (
    <div className="signup_main_container">
      <Paper elevation={3}>
        <h1 style={{ margin: 15, color: "#ff4d82" }}>{"SignUp"}</h1>
        <div>
          <TextField
            id="Name"
            label="Enter Name"
            variant="outlined"
            style={{ margin: 8, width: "350px" }}
            onChange={(e) => setuserInfo({ ...userInfo, name: e.target.value })}
          />
        </div>
        <div>
          <FormControl style={{ margin: 10, width: 220 }}>
            <InputLabel>Select Country</InputLabel>
            <Select
              value={userInfo.country}
              onChange={(e) =>
                setuserInfo({ ...userInfo, country: e.target.value })
              }
            >
              {Object.values(countryInfo[0])
                .sort()
                .map((cntInfo) => (
                  <MenuItem key={cntInfo} value={cntInfo}>
                    {cntInfo}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            id="uid"
            label="Enter UserId"
            variant="outlined"
            style={{ margin: 8, width: "238px" }}
            onChange={(e) =>
              setuserInfo({ ...userInfo, userId: e.target.value })
            }
          />
        </div>
        <div>
          <FormControl variant="outlined" style={{ margin: 8 }}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={userInfo.showPassword ? "text" : "password"}
              value={userInfo.password}
              onChange={(e) =>
                setuserInfo({ ...userInfo, password: e.target.value })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {userInfo.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </div>
        <div>
          <TextField
            id="Pass"
            label="Confirm Password"
            type="password"
            variant="outlined"
            style={{ margin: 8, width: "238px" }}
            onChange={(e) =>
              setuserInfo({ ...userInfo, confirmPass: e.target.value })
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
          disabled={userInfo.password !== userInfo.confirmPass}
          onClick={signUp}
        >
          SignUp
        </Button>
        {userInfo.password !== userInfo.confirmPass && (
          <p>Mismatch in password and confirm Password</p>
        )}
      </Paper>
    </div>
  );
};
export default SignUp;
