import React, { useState } from "react";
import DataSourceTrend from "../../components/graphs/data_source/DataSourceTrend";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import LogsTrend from "../../components/graphs/data_source/LogsTrend";
import EventCount from "../../components/graphs/data_source/EventCount";
import FailedLogins from "../../components/graphs/data_source/FailedLogins";
import Severity from "../../components/graphs/data_source/Severity";
import TopDevicesChart from "../../components/graphs/data_source/TopDevicesChart";
import EventTypeChart from "../../components/graphs/data_source/EventType";

const datasrc = [
  {
    name: "data Source Trend",
    url: "/dashboard-module/api/dashboard/dataSourceTrend",
  },
  {
    name: "logs Trend",
    url: "/dashboard-module/api/dashboard/logsTrend",
  },
  {
    name: "event Count",
    url: "/dashboard-module/api/dashboard/eventCount",
  },
  {
    name: "failed Logins",
    url: "/dashboard-module/api/dashboard/failedLogins",
  },
  {
    name: "severity",
    url: "/dashboard-module/api/dashboard/severity",
  },
  {
    name: "event Types",
    url: "/dashboard-module/api/dashboard/eventt",
  },
  {
    name: "event Severity",
    url: "/dashboard-module/api/dashboard/eventSeverity",
  },
  {
    name: "top Devices",
    url: "/dashboard-module/api/dashboard/topDevices",
  },
];

const VisualizationPage = () => {
  const [value, setValue] = useState(datasrc[0].name);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            onChange={handleChange}
            aria-label="tabs"
          >
            {datasrc.map((item, i) => (
              <Tab key={i} label={item.name} value={item.name} />
            ))}
          </TabList>
        </Box>
        {datasrc.map((item, i) => (
          <TabPanel key={i} value={item.name}>
            {item.name === "data Source Trend" ? (
              <DataSourceTrend url={item.url} />
            ) : item.name === "logs Trend" ? (
              <LogsTrend url={item.url} />
            ) : item.name === "event Count" ? (
              <EventCount url={item.url} />
            ) : item.name === "failed Logins" ? (
              <FailedLogins url={item.url} />
            ) : item.name === "severity" ? (
              <Severity url={item.url} />
            ) : item.name === "top Devices" ? (
              <TopDevicesChart url={item.url} />
            ) : item.name === "event Types" ? (
              <EventTypeChart url={item.url} />
            ) : (
              item.name
            )}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default VisualizationPage;
