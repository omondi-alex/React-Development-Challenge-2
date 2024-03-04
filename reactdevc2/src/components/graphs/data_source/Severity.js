import { Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiService from "../../../api/apiService";
import { timeFormat } from "../../../utils/utils";
import { PieChart } from "@mui/x-charts";

const today = new Date();
const defaultStartDate = dayjs(today).subtract(2, "day");

const Severity = ({ url }) => {
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
  }, [filterData.endDate, filterData.startDate, token, url]);

  // Prepare data for the chart
  const chartData = data?.map((item) => ({
    id: item.name,
    label: item.name,
    value: item.docCount,
  }));

  return (
    <div>
      {/* FILTER */}
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
      </Grid>
      {/* PIE GRAPH */}
      <div style={{ width: "100%", marginTop: "30px" }}>
        {data && (
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data: chartData,
              },
            ]}
            height={400}
          />
        )}
      </div>
    </div>
  );
};

export default Severity;
