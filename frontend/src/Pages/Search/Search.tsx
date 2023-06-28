import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  getAllCountries,
  getAllHobbies,
  getAllLanguages,
} from "../../logic/selectValues";
import { useTheme } from "@emotion/react";
import { formatNumberArrayToQuery } from "../../logic/other";
import { searchUsers } from "../../logic/user";
import SearchResult from "./SearchResult/SearchResult";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name: string, hobbies: string[], theme: any) {
  return {
    fontWeight:
      hobbies.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Search = () => {
  const theme = useTheme();
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [possibleHobbies, setPossibleHobbies] = useState<any[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<any[]>([]);
  const [possibleCountries, setPossibleCountries] = useState<any[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  const [possibleLanguages, setPossibleLanguages] = useState<any[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<any[]>([]);
  const usernameRef: any = useRef();

  useEffect(() => {
    const getPossibleHobbies = async () => {
      const data = await getAllHobbies();
      setPossibleHobbies(data);
    };
    const getPossibleCountries = async () => {
      const data = await getAllCountries();
      setPossibleCountries(data);
    };
    const getPossibleLanguages = async () => {
      const data = await getAllLanguages();
      setPossibleLanguages(data);
    };
    getPossibleHobbies();
    getPossibleCountries();
    getPossibleLanguages();
  }, []);

  const handleHobbySelectChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setSelectedHobbies(newValue);
  };

  const handleCountrySelectChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setSelectedCountries(newValue);
  };
  const handleLanguageSelectChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setSelectedLanguages(newValue);
  };

  const handleSearch = async () => {
    const formattedHobbies = formatNumberArrayToQuery(
      selectedHobbies,
      "hobbies"
    );
    const formattedCountries = formatNumberArrayToQuery(
      selectedCountries,
      "countries"
    );
    const formattedLanguages = formatNumberArrayToQuery(
      selectedLanguages,
      "languages"
    );
    const username = usernameRef.current.value;
    let query = "";
    if (username) {
      query += `username=${username}&`;
    }
    if (formattedHobbies) {
      query += formattedHobbies;
    }
    if (formattedCountries) {
      query += formattedCountries;
    }
    if (formattedLanguages) {
      query += formattedLanguages;
    }
    const searchedUsers = await searchUsers(query);
    setSearchResult(searchedUsers);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ width: "20%", height: "80vh", pl: 2, pt: 3 }}>
          <Typography variant="h4">Search</Typography>
          <TextField
            label="Username"
            variant="outlined"
            inputRef={usernameRef}
          />
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel id="hobbies-label">Hobbies</InputLabel>
            <Select
              labelId="hobbies-label"
              multiple
              value={selectedHobbies}
              onChange={handleHobbySelectChange}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selected: any) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: any) => {
                    const hobby = possibleHobbies.find(
                      (h: any) => h.id === value
                    );
                    return <Chip key={value} label={hobby ? hobby.name : ""} />;
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {possibleHobbies.map((hobby: { id: number; name: string }) => (
                <MenuItem
                  key={hobby.id}
                  value={hobby.id}
                  style={getStyles(hobby.name, selectedHobbies, theme)}
                >
                  {hobby.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel id="countries-label">Countries</InputLabel>
            <Select
              labelId="countries-label"
              multiple
              value={selectedCountries}
              onChange={handleCountrySelectChange}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selected: any) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: any) => {
                    const country = possibleCountries.find(
                      (c: any) => c.id === value
                    );
                    return (
                      <Chip key={value} label={country ? country.name : ""} />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {possibleCountries.map(
                (country: { id: number; name: string }) => (
                  <MenuItem
                    key={country.id}
                    value={country.id}
                    style={getStyles(country.name, selectedHobbies, theme)}
                  >
                    {country.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel id="languages-label">Languages</InputLabel>
            <Select
              labelId="languages-label"
              multiple
              value={selectedLanguages}
              onChange={handleLanguageSelectChange}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selected: any) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: any) => {
                    const language = possibleLanguages.find(
                      (c: any) => c.id === value
                    );
                    return (
                      <Chip key={value} label={language ? language.name : ""} />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {possibleLanguages.map(
                (language: { id: number; name: string }) => (
                  <MenuItem
                    key={language.id}
                    value={language.id}
                    style={getStyles(language.name, selectedHobbies, theme)}
                  >
                    {language.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <Box sx={{ flex: 1, ml: 2, overflowY: "auto", height: "100%" }}>
          <SearchResult users={searchResult} />
        </Box>
      </Box>
    </>
  );
};

export default Search;
