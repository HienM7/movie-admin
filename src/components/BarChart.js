import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { makeStyles, Button, MenuItem, TextField } from "@material-ui/core";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";

const lineColors = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(54, 162, 235)",
  "rgb(75, 192, 192)",
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
  },
};

const useStyle = makeStyles((theme) => ({
  chart: {
    marginTop: 20,
  },
  sideForm: {
    display: "flex",
    justifyContent: "center",
  },
}));
const top100Films = [
  { title: "The Shawshank Redemption", id: 1994 },
  { title: "The Godfather", id: 1972 },
  { title: "The Godfather: Part II", id: 1974 },
  { title: "The Dark Knight", id: 2008 },
  { title: "12 Angry Men", id: 1957 },
  { title: "Schindler's List", id: 1993 },
  { title: "Pulp Fiction", id: 1994 },
  { title: "The Lord of the Rings: The Return of the King", id: 2003 },
  { title: "The Good, the Bad and the Ugly", id: 1966 },
  { title: "Fight Club", id: 1999 },
];

export default function ({ movies, display, ...props }) {
  const classes = useStyle();
  const [chartData, setChartData] = useState([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const responseRevenues = await axios.get(
        "https://fbk-api-gateway.herokuapp.com/revenues/total/by-movie/latest"
      );
      if (responseRevenues.status === 200 || responseRevenues.status === 201) {
        let color = 0;
        setChartData(
          responseRevenues.data.data.map((item) => ({
            label: movies.find((movie) => movie.movie_id == item.movieId)
              ?.movie_name,
            backgroundColor: lineColors[color],
            borderColor: lineColors[color++],
            // borderWidth: 2,
            data: [item.total],
          }))
        );
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const setDataColumn = async (data, index) => {
    if (!data) {
      return;
    }
    console.log(index);
    const responseRevenues = await axios.get(
      `https://fbk-api-gateway.herokuapp.com/revenues/total/by-movie/${data.movie_id}`
    );
    if (responseRevenues.status === 200 || responseRevenues.status === 201) {
      setChartData(
        chartData.map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                label: movies.find(
                  (movie) =>
                    movie.movie_id === responseRevenues.data.data.movieId
                )?.movie_name,

                data: [responseRevenues.data.data.total],
              }
            : item
        )
      );
    }
  };
  console.log("alo", chartData);
  if (loading) {
    return <div></div>;
  }
  return (
    <div className={classes.chart} style={{ display: display }}>
      <div className={classes.sideForm}>
        {[...Array(5)].map((item, index) => (
          <Autocomplete
            key={index}
            value={movies.find(
              (item) => chartData[index]?.label === item.movie_name
            )}
            onChange={(event, newValue) => {
              console.log(newValue);
              setDataColumn(newValue, index);
            }}
            id="combo-box-demo"
            options={movies}
            getOptionLabel={(option) => option.movie_name}
            style={{ width: 200, margin: 20 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Column ${index + 1}`}
                variant="outlined"
              />
            )}
          />
        ))}
      </div>
      <Bar
        options={options}
        data={{
          labels: ["Total revenues of movies"],
          datasets: chartData,
        }}
        height={80}
      />
    </div>
  );
}
