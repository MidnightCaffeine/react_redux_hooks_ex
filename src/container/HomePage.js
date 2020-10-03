import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
const countryInfo = require("../raw/country_list.json");

//Fn. :  input param is url (string) and returns fetched data for the same
const fetchJson = async (url) => {
  const response = await fetch(url);
  return response.json();
};

//Fn. : input params is object, checks if the object is empty and returns
const checkEmpObj = (obj) => {
  const isEmptyObj =
    Object.keys(obj).length === 0 && obj.constructor === Object;
  return isEmptyObj;
};

//Renders Homepage : After private Route verification through local storage, contains currency conversion and logout view
const HomePage = () => {
  const history = useHistory();
  const [currencyInfo, setCurrencyInfo] = useState({});
  const [userCurrInfo, setUserCurrInfo] = useState({
    inputCurr: "",
    outputCurr: "",
    conversionAmt: 1000,
  });

  // set the currency information usin the API on Mount
  useEffect(() => {
    fetchJson("https://api.exchangeratesapi.io/latest").then((data) =>
      setCurrencyInfo(data)
    );
  }, []);

  const logout = () => {
    history.push(`/`);
  };
  const convertAmt = () => {
    const amt = (
      (userCurrInfo.conversionAmt /
        currencyInfo.rates[userCurrInfo.inputCurr]) *
      currencyInfo.rates[userCurrInfo.outputCurr]
    ).toFixed(2);
    console.log(" amt ", amt);
    setUserCurrInfo({ ...userCurrInfo, convertedAmt: amt });
  };
  return !checkEmpObj(currencyInfo) ? (
    <div>
      <div>
        <h1
          style={{
            margin: 15,
            color: "#ff4d82",
            position: "absolute",
            top: "0",
            left: "0"
          }}
        >
          Currency Convertor HomePage
        </h1>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 10, position: "absolute", right: "0", top: "0" }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
      <Paper elevation={3}>
        <div>
          <h4 style={{ margin: 15, color: "#ff4d82" }}>
            {`Currency Data last Synced on : ${currencyInfo.date}`}
          </h4>
          <div>
            <div>
              <FormControl style={{ margin: 10, width: 300 }}>
                <InputLabel id="demo-simple-select-label">
                  Input Currency
                </InputLabel>
                <Select
                  id="demo-simple-select"
                  value={userCurrInfo.inputCurr}
                  onChange={(e) =>
                    setUserCurrInfo({
                      ...userCurrInfo,
                      inputCurr: e.target.value,
                    })
                  }
                >
                  {Object.keys(currencyInfo.rates)
                    .sort()
                    .map((curr) => (
                      <MenuItem key={curr} value={curr}>
                        {`${curr} - ${countryInfo[0][curr]}`}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                id="amt"
                label="Amount to Convert"
                variant="outlined"
                type="number"
                color="secondary"
                value={userCurrInfo.conversionAmt}
                onChange={(e) =>
                  setUserCurrInfo({
                    ...userCurrInfo,
                    conversionAmt: e.target.value,
                  })
                }
                style={{ margin: 10, width: 300 }}
              />
              <FormControl style={{ margin: 10, width: 220 }}>
                <InputLabel>Output Currency</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={userCurrInfo.outputCurr}
                  onChange={(e) =>
                    setUserCurrInfo({
                      ...userCurrInfo,
                      outputCurr: e.target.value,
                    })
                  }
                >
                  {Object.keys(currencyInfo.rates)
                    .sort()
                    .map((curr) => (
                      <MenuItem key={curr} value={curr}>
                        {`${curr} - ${countryInfo[0][curr]}`}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <Button
              variant="outlined"
              color="secondary"
              style={{ margin: 10 }}
              onClick={convertAmt}
            >
              Compute
            </Button>
            {userCurrInfo.inputCurr.length > 0 &&
              userCurrInfo.inputCurr === userCurrInfo.outputCurr && (
                <p style={{ color: "red" }}>
                  *It may not be useful if input and output currency selected is
                  same
                </p>
              )}
          </div>
          {!!userCurrInfo.convertedAmt && (
            <h3
              style={{ color: "#ff4d82" }}
            >{`The Calculated Amount is ${userCurrInfo.convertedAmt} ${userCurrInfo.outputCurr}`}</h3>
          )}
        </div>
      </Paper>
    </div>
  ) : (
    <CircularProgress color="secondary" />
  );
};

export default HomePage;

//Some Apis to use

//http://ip-api.com/json
//https://api.exchangeratesapi.io/latest
//https://api.exchangeratesapi.io/latest?base=USD
//https://api.coindesk.com/v1/bpi/currentprice.json
