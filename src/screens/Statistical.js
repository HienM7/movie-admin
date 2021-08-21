import React, { useEffect, useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import axios from "axios";

const useStyle = makeStyles((theme) => ({
  chart: {
    marginTop: 25,
    "& h1": {
      display: "flex",
      justifyContent: "center",
    },
  },
  toggle: {
    marginLeft: 50,
  },
}));

export default function () {
  const classes = useStyle();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState("month");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResponse = await axios.get(
          "https://fbk-api-gateway.herokuapp.com/movie"
        );
        if (movieResponse.status === 200 || movieResponse.status === 201) {
          setMovies(movieResponse.data.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchMovie();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className={classes.chart}>
      <h1>Statistics</h1>
      <div className={classes.toggle}>
        <Button
          color="primary"
          variant={active === "month" ? "contained" : "outlined"}
          onClick={() => setActive("month")}
        >
          Month view
        </Button>
        <Button
          color="primary"
          variant={active === "movie" ? "contained" : "outlined"}
          onClick={() => setActive("movie")}
        >
          Movie view
        </Button>
      </div>
      <LineChart movies={movies} display={active === "month" ? "" : "none"} />
      <BarChart movies={movies} display={active === "movie" ? "" : "none"} />
    </div>
  );
}
