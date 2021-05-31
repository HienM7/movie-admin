import { useState, useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const useStyle = makeStyles((theme) => ({
  chart: {
    marginTop: 20,
  },
  datePicker: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 15,
    "& > button": {
      position: "relative",
      top: 5.5,
      marginLeft: 20,
      padding: 10,
    },
  },
}));

// const labels = Utils.months({count: 7});
// const data = {
//   labels: [...Array(30)].map((item) => a++),
//   datasets: [
//     {
//       label: "My First Dataset",
//       data: [65, 59, 80, 81, 56, 55, 40],
//       fill: false,
//       borderColor: "rgb(75, 192, 192)",
//       tension: 0.1,
//     },
//     {
//       label: "My First Dataset2",
//       data: [55, 12, 45, 7, 7, 8, 1, 0, 0, 0],
//       fill: false,
//       borderColor: "rgb(75, 192, 192)",
//       tension: 0.1,
//     },
//     {
//       label: "My First Dataset3",
//       data: [12, 33, 100, 53, 77, 250, 111],
//       fill: false,
//       borderColor: "rgb(75, 192, 192)",
//       tension: 0.1,
//     },
//   ],
// };

const lineColors = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgba(201, 203, 207)",
  "rgba(153, 102, 255)",
  "rgb(0,0,128)",
  "rgb(128,0,128)",
  "rgb(0,128,0)",
  "rgb(128,128,0)",
  "rgb(255,0,0)",
  "rgb(128,128,128)",
  "rgb(0,0,255)",
  "rgb(0,0,128)",
  "rgb(0,255,255)",
];

const options = {
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} $`;
        },
      },
    },
    x: {
      ticks: {
        callback: function (value) {
          return `Day ${value + 1}`;
        },
      },
    },
  },
};

const LineChart = ({ movies, display, ...props }) => {
  const classes = useStyle();

  const [chartData, setChartData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const searchMonthlyMovie = async () => {
    const startOfMonth = moment(selectedDate)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment(selectedDate).endOf("month").format("YYYY-MM-DD");
    try {
      const responseRevenues = await axios.get(
        `https://fbk-api-gateway.herokuapp.com/revenues?from=${startOfMonth}&to=${endOfMonth}`
      );
      if (responseRevenues.status === 200 || responseRevenues.status === 201) {
        const dataSet = [];
        let group = responseRevenues.data.data.reduce((r, a) => {
          (r[a.movieId] =
            r[a.movieId] || [...Array(31)].map((item) => 0)).splice(
            new Date(a.date).getDate() - 1,
            1,
            a.total
          );
          return r;
        }, {});

        let color = 0;
        for (const key in group) {
          if (movies.find((item) => item.movie_id == key)?.movie_name) {
            dataSet.push({
              label: movies.find((item) => item.movie_id == key)?.movie_name,
              data: group[key],
              fill: false,
              borderColor: lineColors[color],
              backgroundColor: lineColors[color++],
              tension: 0.1,
            });
          }
        }
        setChartData(dataSet);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('fetchData');
    const fetchData = async () => {
      try {
        const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
        const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
        const responseRevenues = await axios.get(
          `https://fbk-api-gateway.herokuapp.com/revenues?from=${startOfMonth}&to=${endOfMonth}`
        );
        if (
          responseRevenues.status === 200 ||
          responseRevenues.status === 201
        ) {
          const dataSet = [];
          let group = responseRevenues.data.data.reduce((r, a) => {
            (r[a.movieId] =
              r[a.movieId] || [...Array(31)].map((item) => 0)).splice(
              new Date(a.date).getDate() - 1,
              1,
              a.total
            );
            return r;
          }, {});

          let color = 0;
          for (const key in group) {
            if (movies.find((item) => item.movie_id == key)?.movie_name) {
              dataSet.push({
                label: movies.find((item) => item.movie_id == key)?.movie_name,
                data: group[key],
                fill: false,
                borderColor: lineColors[color],
                backgroundColor: lineColors[color++],
                tension: 0.1,
              });
            }
          }
          setChartData(dataSet);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  let a = 0;
  return (
    <div className={classes.chart} {...props} style={{display: display}}>
      <div className={classes.datePicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            variant="inline"
            inputVariant="outlined"
            openTo="year"
            views={["year", "month"]}
            label="Year and Month"
            helperText="Start from year selection"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <Button
          onClick={searchMonthlyMovie}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>

      <Line
        options={options}
        height={80}
        data={{
          labels: [...Array(31)].map((item) => ++a),
          datasets: chartData,
        }}
      />
    </div>
  );
};

export default LineChart;
