import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Paper } from "@material-ui/core";
import "./styles.scss";
const userData = require("../raw/user_Data.json");

//Renders Login component with login validations
const Login = () => {
  const history = useHistory();
  const [loginInfo, setloginInfo] = useState({
    userId: "",
    password: "",
    validateLogin: {
      displayStaus: false,
      validated: false,
    },
  });

  const updateLoginInfo = () => {
    checkLoginData();
  };

  const checkLoginData = () => {
    setloginInfo({
      ...loginInfo,
      validateLogin: { displayStaus: true, validated: false },
    });
    userData.forEach((data) => {
      if (data.uid === loginInfo.userId && data.pass === loginInfo.password) {
        setloginInfo({
          ...loginInfo,
          validateLogin: { displayStaus: true, validated: true },
        });
        localStorage.setItem("LoginSucess", loginInfo.validateLogin.validated);
        history.push("/HomePage");
      }
    });
  };

  const routeChange = () => {
    history.push(`/SignUp`);
  };

  return (
    <Paper elevation={3}>
      <div className="login_main_container">
        <h1 style={{ margin: 15, color: "#ff4d82" }}>
          Welcome to Currency Calculator Applicaton
        </h1>
        <div className="login_input_container">
          <TextField
            id="uid"
            label="UserId"
            variant="outlined"
            onChange={(e) =>
              setloginInfo({ ...loginInfo, userId: e.target.value })
            }
            style={{ margin: 8 }}
          />
          <TextField
            id="pass"
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            onChange={(e) =>
              setloginInfo({ ...loginInfo, password: e.target.value })
            }
            style={{ margin: 8 }}
          />
        </div>
        <div className="login_button_container">
          <Button
            variant="outlined"
            color="primary"
            onClick={updateLoginInfo}
            disabled={!(loginInfo.userId.length && loginInfo.password.length)}
            style={{ margin: 5 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ margin: 5 }}
            onClick={routeChange}
          >
            Signup
          </Button>
        </div>
        {loginInfo.validateLogin.displayStaus
          ? loginInfo.validateLogin.validated
            ? "Sucess"
            : "Failed"
          : " "}
      </div>
    </Paper>
  );
};

export default Login;
