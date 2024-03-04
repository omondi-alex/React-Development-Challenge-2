import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import apiService from "../../../api/apiService";
import { useSelector } from "react-redux";

const TopDevicesChart = ({ url }) => {
  const [data, setData] = useState(null);
  const { token } = useSelector((state) => state);
  // const colors = ['#02d575', '#FF8042', '#FFBB28',  '#ff001f'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.post(
          url,
          {
            startDate: "2024-02-25 12:00:00",
            endDate: "2024-02-27 12:00:00",
            noOfDevices: 10,
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
  }, [token, url]);

  const transformedData = data?.map((item, index) => ({
    label: item.name,
    value: item.docCount,
    // color: colors[index % colors.length]
  }));

  return (
    data && (
      <PieChart
        series={[
          {
            data: transformedData,
          },
        ]}
        height={400}
      />
    )
  );
};

export default TopDevicesChart;
