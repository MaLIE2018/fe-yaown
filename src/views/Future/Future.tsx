import {
  Box,
  InputAdornment,
  List,
  ListItem,
  Typography,
  FormControl,
  Input,
} from "@material-ui/core";
import { PieChart } from "components/layout/diagram/pie/PieChart";
import GeneralBox from "components/Utils/GeneralBox/GeneralBox";
import getCurrencySymbol from "currency-symbols";
import { useDispatch } from "hooks/useDispatch";
import useSelector from "hooks/useSelector";
import React, { useState } from "react";

import { futureMonth, getWorkingYears } from "utils/helpers/future";
import useStyles from "./Future,styles";
interface State {
  pension: string;
  age: string;
  savingRate: string;
  increaseSavingRate: string;
  lifetime: string;
  averageAnnualROI: string;
  desiredPension: string;
  otherIncome: string;
  cAge: string;
  investRate: string;
}
const Future: React.FC<{}> = () => {
  const classes = useStyles();
  const { settings } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [futureM, setFutureM] = useState<string | undefined>(undefined);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "SET_ESTIMATES",
        payload: { id: prop, newStatus: Number(event.target.value) },
      });
    };

  React.useEffect(() => {
    const newTotal = futureMonth(settings.estimates);
    setFutureM(newTotal);
  }, [settings]);
  return (
    <div className={classes.future}>
      <Box
        width='90%'
        height='10%'
        display='flex'
        justifyContent='start'
        ml={"5%"}
        alignItems='end'>
        <Typography component='div' style={{ width: "100%" }}>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            width='100%'>
            <Box fontWeight='fontWeightRegular' m={1} flexGrow={2}>
              {`Estimated monthly income ${
                new Date().getFullYear() +
                getWorkingYears(settings.estimates.age, settings.estimates.cAge)
              }:`}
            </Box>
            <Box
              fontSize='h6.fontSize'
              fontWeight='fontWeightMedium'
              m={0}
              flexGrow={1}>
              {`${futureM} ${getCurrencySymbol("EUR")}`}
            </Box>
          </Box>
        </Typography>
      </Box>
      <GeneralBox
        render={
          <PieChart
            series={[]}
            labels={["Assets", "Investments", "Accounts", "Cash"]}
          />
        }
      />
      <GeneralBox
        render={
          <List>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Current age</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-cAge'
                  value={settings.estimates.cAge}
                  onChange={handleChange("cAge")}
                  endAdornment={
                    <InputAdornment position='end'>years</InputAdornment>
                  }
                  aria-describedby='standard-cAge-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "years",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Retirement age</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-age'
                  value={settings.estimates.age}
                  onChange={handleChange("age")}
                  endAdornment={
                    <InputAdornment position='end'>years</InputAdornment>
                  }
                  aria-describedby='standard-age-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "years",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Annual savings rate</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-savingRate'
                  value={settings.estimates.savingRate}
                  onChange={handleChange("savingRate")}
                  endAdornment={
                    <InputAdornment position='end'>Euro</InputAdornment>
                  }
                  aria-describedby='standard-savingRate-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "saving rate",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>
                  Annual increase in savings rate
                </Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-increaseSaving'
                  value={settings.estimates.increaseSavingRate}
                  onChange={handleChange("increaseSavingRate")}
                  endAdornment={
                    <InputAdornment position='end'>%</InputAdornment>
                  }
                  aria-describedby='standard-increaseSaving-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "Annual increase in savings rate",
                  }}
                />
              </FormControl>{" "}
            </ListItem>

            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>
                  Annual increase in investments
                </Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-investRate'
                  value={settings.estimates.investRate}
                  onChange={handleChange("investRate")}
                  endAdornment={
                    <InputAdornment position='end'>Euro</InputAdornment>
                  }
                  aria-describedby='standard-investRate-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "saving rate",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Average Annual ROI</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-averageAnnualReturn'
                  value={settings.estimates.averageAnnualROI}
                  onChange={handleChange("averageAnnualROI")}
                  endAdornment={
                    <InputAdornment position='end'>%</InputAdornment>
                  }
                  aria-describedby='standard-averageAnnualReturn-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "average Annual Return",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>
                  Forecast monthly pension
                </Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-pension'
                  value={settings.estimates.pension}
                  onChange={handleChange("pension")}
                  endAdornment={
                    <InputAdornment position='end'>Euro </InputAdornment>
                  }
                  aria-describedby='standard-pension-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "forecast pension in Euro",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>
                  Lifetime period after retirement
                </Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-lifetime'
                  value={settings.estimates.lifetime}
                  onChange={handleChange("lifetime")}
                  endAdornment={
                    <InputAdornment position='end'>Years </InputAdornment>
                  }
                  aria-describedby='standard-lifetime-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "Lifetime period after retirement in years",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Desired pension</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-desiredPension'
                  value={settings.estimates.desiredPension}
                  onChange={handleChange("desiredPension")}
                  endAdornment={
                    <InputAdornment position='end'>Euro </InputAdornment>
                  }
                  aria-describedby='standard-desiredPension-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "Desired pension in euro",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
            <ListItem>
              <Typography component='div'>
                <Box fontWeight='fontWeightRegular'>Other monthly income</Box>
              </Typography>{" "}
              <FormControl>
                <Input
                  type='number'
                  id='standard-adornment-otherIncome'
                  value={settings.estimates.otherIncome}
                  onChange={handleChange("otherIncome")}
                  endAdornment={
                    <InputAdornment position='end'>Euro </InputAdornment>
                  }
                  aria-describedby='standard-otherIncome-helper-text'
                  inputProps={{
                    min: "0",
                    "aria-label": "Other monthly income in euro",
                  }}
                />
              </FormControl>{" "}
            </ListItem>
          </List>
        }
        title='Estimates'
      />
    </div>
  );
};

export default Future;
