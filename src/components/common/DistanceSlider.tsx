import React, { useState } from "react";

import {
  Typography,
  Box,
  Divider,
  Switch,
  FormControlLabel,
  Slider,
  Rating,
} from "@mui/material";

const DistanceSlider = (props: any) => {
  /* Type Switch */

  /* Distance Slider */
  const kms = [5, 10, 20, 30, 40, 50];

  const distRange: any = [];

  kms.forEach((km) => {
    distRange.push({ value: km, label: km });
  });

  function valuetext(value: number) {
    return `${value} km`;
  }

  function valueLabelFormat(value: number) {
    return `${value} kms`;
  }

  const defaultFilterValues = {
    is_veg: "NO",
    distance: 5,
    rating_avg: 0,
  };

  const [filterValues, setFilterValues] = useState(defaultFilterValues);

  const handleDistanceChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setFilterValues({ ...filterValues, distance: newValue });
    }
    props.onFilter({ ...filterValues, distance: newValue });
  };

  const onTypeChangeHandler = (event: any) => {
    let is_veg = event.target.checked ? "YES" : "NO";
    setFilterValues({ ...filterValues, is_veg });
    props.onFilter({ ...filterValues, is_veg });
  };

  const handleRatingChange = (event: any, newValue: any) => {
    setFilterValues({ ...filterValues, rating_avg: newValue });
    props.onFilter({ ...filterValues, rating_avg: newValue });
  };

  return (
    <>
      <FormControlLabel
        value="VEG"
        control={<Switch color="secondary" />}
        label="Veg Only"
        labelPlacement="start"
        onChange={onTypeChangeHandler}
      />
      <Divider className="verticalDivider" />
      <br />
      <Box className="distSelection">
        <Typography id="non-linear-slider" className="alignCenter">
          Distance : {valueLabelFormat(filterValues.distance)}
        </Typography>
        <Slider
          value={filterValues.distance}
          onChange={handleDistanceChange}
          color="secondary"
          aria-label="Distance within"
          defaultValue={5}
          getAriaValueText={valuetext}
          step={5}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          marks={distRange}
          min={5}
          max={50}
        />
      </Box>
      <Divider className="verticalDivider" />
      <br />
      <Box className="distSelection alignCenter">
        <Typography>By Rating</Typography>
        <Rating
          name="simple-controlled"
          defaultValue={defaultFilterValues.rating_avg}
          value={filterValues.rating_avg}
          onChange={handleRatingChange}
        />
      </Box>
    </>
  );
};
export default DistanceSlider;
