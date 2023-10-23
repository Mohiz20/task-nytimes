import React, { useEffect, useState } from "react";
import ActionAreaCard from "./components/Card";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Select from "react-select";

const options = [
  { value: 'arts', label: 'Arts'},
  { value: 'movies', label: 'Movies',},
  { value: 'business', label: 'Business',},
  { value: 'food', label: 'Food',},
  { value: 'fashion', label: 'Fashion',}
];

function App() {
  const [type, setType] = useState(  { value: 'arts', label: 'Arts'});
  const [loading, setLoading] = useState(true);
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    getTopStories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const getTopStories = async () => {
    const data = await axios.get(
      `http://localhost:8080/top-stories?type=${type.value}`
    );
    setLoading(false);
    if (data?.data?.data?.results) setTopStories(data?.data?.data.results);
  };

  const handleSelectChange = (selectedOption) => {
    setType(selectedOption);
  };
  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isSearchable={true}
        isClearable={true}
        placeholder="Select Type..."
        name="type"
        options={options}
        value={type}
        onChange={handleSelectChange}
      />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{marginTop: '20px'}}

      >
        {!loading &&
          topStories?.map((story, index) => {
            return (
              <Grid item xs key={index}>
                <ActionAreaCard story={story} />
              </Grid>
            );
          })}
      </Grid>
      {loading && (
        <CircularProgress style={{ position: "absolute", top: "50px" }} />
      )}
    </div>
  );
}

export default App;
