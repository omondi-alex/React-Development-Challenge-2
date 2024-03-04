import React, { useEffect, useState } from "react";
import apiService from "../../../api/apiService";
import { useSelector } from "react-redux";
import { LineChart, PieChart } from "@mui/x-charts";
import { FormControl, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { timeFormat } from "../../../utils/utils";

const today = new Date();
const defaultStartDate = dayjs(today).subtract(2, "day");

const FailedLogins = ({ url }) => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState({
    startDate: defaultStartDate,
    endDate: dayjs(new Date()),
    noOfIps: 5,
  });
  const { token } = useSelector((state) => state);
  useEffect(() => {
    console.log("Url", url);
    const fetchData = async () => {
      try {
        const res = await apiService.post(
          url,
          {
            startDate: timeFormat(filterData.startDate),
            endDate: timeFormat(filterData.endDate),
            noOfIps: filterData.noOfIps,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [
    filterData.endDate,
    filterData.noOfIps,
    filterData.startDate,
    token,
    url,
  ]);

  const lineChartData = {
    xAxis: [
      {
        scaleType: "point",
        data: data?.windows?.ips?.map((item) => item.name),
      },
    ],
    series: [
      {
        data: data?.windows?.ips?.map((item) => item.docCount),
        label: "Windows",
      },
      { data: data?.linux?.ips?.map((item) => item.docCount), label: "Linux" },
    ],
  };

  return (
    <div>
      {/* FILTER SECTION */}
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6} md={4}>
          <DatePicker
            minDate={filterData.endDate.subtract(7, "days")}
            maxDate={dayjs(new Date()) && dayjs(filterData.endDate)}
            label="Start Date"
            value={filterData?.startDate}
            onChange={(val) => setFilterData({ ...filterData, startDate: val })}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <DatePicker
            minDate={dayjs(filterData.startDate)}
            maxDate={dayjs(new Date())}
            label="End Date"
            value={filterData.endDate}
            onChange={(val) => setFilterData({ ...filterData, endDate: val })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <TextField
              label="Number of Ips"
              value={filterData.noOfIps}
              onChange={(e) =>
                setFilterData({ ...filterData, noOfIps: e.target.value })
              }
              type="number"
              inputProps={{ min: 3 }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ width: "100%", marginTop: "30px" }}>
        {data && (
          <LineChart
            series={lineChartData.series}
            xAxis={lineChartData.xAxis}
            height={400}
          />
        )}
      </div>
    </div>
  );
};

export default FailedLogins;
