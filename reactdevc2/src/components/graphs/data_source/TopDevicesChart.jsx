import {PieChart} from '@mui/x-charts/PieChart';

const TopDevicesChart = ({ data }) => {
    // const colors = ['#02d575', '#FF8042', '#FFBB28',  '#ff001f'];

    const transformedData = data.map((item, index) => ({
        label: item.name,
        value: item.docCount,
        // color: colors[index % colors.length]
    }));

    return (
        <PieChart
            series={[
                {
                    data: transformedData
                }
            ]}
            height={400}
        />
    );
}

export default TopDevicesChart;
