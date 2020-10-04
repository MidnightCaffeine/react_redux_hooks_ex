import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { addUserInfo } from "../redux/actions/signupAction";
const countryInfo = require("../raw/country_list.json");
// React Component SignUp : Display a signup page and handles user signup validation
const SignUp = () => {
  //Get userData from state
  const userData = useSelector((state) => state.signup.userData);

  //Use for all the dispatch actions
  const dispatch = useDispatch();

  const history = useHistory();
  const [userInfo, setuserInfo] = useState({
    password: "",
    showPassword: false,
    confirmPass: "",
    name: "",
    userId: "",
    country: "",
  });
  const [validInfo, setValidInfo] = useState({
    validUid: false,
    validConfPass: false,
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

  const handleIdChange = (e) => {
    const uidExists = userData
      .map((data) => data["userId"])
      .includes(e.target.value);
    setValidInfo({
      ...validInfo,
      validUid: !uidExists,
    });
    setuserInfo({ ...userInfo, userId: e.target.value });
  };
  const handleConfPassChange = (e) => {
    setValidInfo({
      ...validInfo,
      validConfPass: userInfo.password === e.target.value,
    });
    setuserInfo({ ...userInfo, confirmPass: e.target.value });
  };

  const signUp = () => {
    //Below code filter the allowed properties from userInfo Object and dispatch the same
    const allowed = ["password", "userId", "name", "country"];
    const filteredUserInfo = Object.keys(userInfo)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: userInfo[key],
        };
      }, {});
    if (validInfo.validUid && validInfo.validConfPass && !!userInfo.name.length) {
      dispatch(addUserInfo(filteredUserInfo));
      history.push(`/`);
    }
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
            style={{ margin: 8, width: "350px", color: "blue" }}
            onChange={(e) => setuserInfo({ ...userInfo, name: e.target.value })}
            error={userInfo.name === ""}
            helperText={userInfo.name === "" ? "Empty field!" : " "}
          />
        </div>
        <div>
          <FormControl
            style={{ margin: 10, width: 220 }}
            error={userInfo.country === ""}
          >
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
            onChange={handleIdChange}
            error={userInfo.userId === "" && !validInfo.validUid}
            helperText={
              userInfo.userId === ""
                ? "Empty field!"
                : validInfo.validUid
                ? " "
                : "User Id already Taken "
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
            onChange={handleConfPassChange}
            error={userInfo.confirmPass === "" && !validInfo.validConfPass}
            helperText={
              userInfo.confirmPass === ""
                ? "Empty field!"
                : validInfo.validConfPass
                ? ""
                : "Password and Confirm Pass Doesn’t Match"
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
          onClick={signUp}
        >
          SignUp
        </Button>
      </Paper>
    </div>
  );
};
export default SignUp;
