import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiService from "../../../api/apiService";
import dayjs from "dayjs";
import { timeFormat } from "../../../utils/utils";
import { BarChart } from "@mui/x-charts";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const today = new Date();
const defaultStartDate = dayjs(today).subtract(2, "day");

const DataSourceTrend = ({ url }) => {
  const [data, setData] = useState(null);
  const [interval, setInterval] = useState(1);
  const [selectedDataName, setSelectedDataName] = useState(null);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const { token } = useSelector((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.post(
          url,
          {
            startDate: timeFormat(startDate),
            endDate: timeFormat(endDate),
            interval: interval,
            intervalUnit: "h",
            dataSource: "linux-events,windows-events,bro-events",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
        setSelectedDataName(res.data[0]?.name); // Select the first data name by default
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [endDate, interval, startDate, token, url]);

  const handleDataNameClick = (name) => {
    setSelectedDataName(name);
  };

  return (
    <div>
      {/* FILTER SECTION */}
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6} md={4}>
          <DatePicker
            minDate={endDate.subtract(7, "days")}
            maxDate={dayjs(new Date()) && dayjs(endDate)}
            label="Start Date"
            value={startDate}
            onChange={(val) => setStartDate(val)}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <DatePicker
            minDate={dayjs(startDate)}
            maxDate={dayjs(new Date())}
            label="End Date"
            value={endDate}
            onChange={(val) => setEndDate(val)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <TextField
              label="Interval"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              type="number"
              inputProps={{ min: 1 }}
            />
          </FormControl>
        </Grid>
      </Grid>
      {/* BUTTONS */}
      <div style={{ marginTop: "30px" }}>
        {data &&
          data.map((item) => (
            <button
              style={
                selectedDataName === item.name
                  ? {
                      backgroundColor: "#172C53",
                      border: "1px solid #172C53",
                      color: "#05F2C7",
                      marginRight: "10px",
                      borderRadius: "6px",
                      padding: "3px 5px",
                    }
                  : {
                      marginRight: "10px",
                      borderRadius: "6px",
                      border: "1px solid #000",
                      padding: "3px 5px",
                    }
              }
              key={item.name}
              onClick={() => handleDataNameClick(item.name)}
            >
              {item.name}
            </button>
          ))}
      </div>

      {/* GRAPH */}
      <div
        style={{
          marginTop: "30px",
          width: "100%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {data && selectedDataName && (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data:
                  data
                    .find((item) => item.name === selectedDataName)
                    ?.subAggregations?.map((subItem) => subItem.name) || [],
              },
            ]}
            series={[
              {
                data:
                  data
                    .find((item) => item.name === selectedDataName)
                    ?.subAggregations?.map((subItem) => subItem.docCount) || [],
                label: data.name,
                color: "#172C53",
              },
            ]}
            height={300}
          />
        )}
      </div>
    </div>
  );
};

export default DataSourceTrend;
