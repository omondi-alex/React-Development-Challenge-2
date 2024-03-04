import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiService from "../../../api/apiService";

const EventTypeChart = ({ url }) => {
  const [data, setData] = useState(null);
  const { token } = useSelector((state) => state);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const res = await apiService.post(
          url,
          {
            startDate: "2024-02-25 12:00:00",
            endDate: "2024-02-27 12:00:00",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          setData(res.data);
        }
        return [];
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventTypes();
  }, [token, url]);
  // const colors = ['#02d575', '#FF8042', '#FFBB28',  '#ff001f'];

  const transformedData = data?.map((item, index) => ({
    label: item.name,
    value: item.docCount,
    // color: colors[index % colors.length]
  }));

  return (
    <div>
      <div style={{ width: "100%" }}>
        {data && (
          <PieChart
            series={[
              {
                data: transformedData,
              },
            ]}
            height={400}
          />
        )}
      </div>
    </div>
  );
};

export default EventTypeChart;
