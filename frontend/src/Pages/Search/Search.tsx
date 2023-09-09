import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  getAllCountries,
  getAllHobbies,
  getAllLanguages,
} from "../../logic/selectValues";
import { calculateTotalPages, formatSearchQuery } from "../../logic/other";
import { searchUsers } from "../../logic/user";
import SearchResult from "./SearchResult/SearchResult";
import { Country, Hobby, Language, User } from "../../logic/interfaces";
import GenderSelect from "../../Components/SelectComponents/GenderSelect";
import LanguageSelect from "../../Components/SelectComponents/LanguageSelect";
import CountrySelect from "../../Components/SelectComponents/CountrySelect";
import HobbySelect from "../../Components/SelectComponents/HobbySelect";

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

const Search = () => {
  const perPage = 10;
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [possibleHobbies, setPossibleHobbies] = useState<Hobby[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<number[]>([]);
  const [possibleCountries, setPossibleCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [possibleLanguages, setPossibleLanguages] = useState<Language[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [onlyWithDescription, setOnlyWithDescription] =
    useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const usernameRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();

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

  const handleHobbySelectChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const newValue =
      typeof value === "string" ? value.split(",").map(Number) : value;

    setSelectedHobbies(newValue);
  };

  const handleCountrySelectChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const newValue =
      typeof value === "string" ? value.split(",").map(Number) : value;
    setSelectedCountries(newValue);
  };

  const handleLanguageSelectChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    const newValue =
      typeof value === "string" ? value.split(",").map(Number) : value;
    setSelectedLanguages(newValue);
  };

  const handleGenderChange = (event: SelectChangeEvent<string[]>) => {
    const newValues = event.target.value as string[];
    setSelectedGender(newValues);
  };
  const handleOnlyWithDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOnlyWithDescription(event.target.checked);
  };

  const handleSearch = async () => {
    if (
      usernameRef === null ||
      usernameRef.current === null ||
      usernameRef.current?.value === null ||
      usernameRef.current?.value === undefined ||
      usernameRef.current === undefined
    ) {
      return;
    }
    const query = formatSearchQuery(
      selectedHobbies,
      selectedCountries,
      selectedLanguages,
      selectedGender,
      usernameRef.current.value,
      onlyWithDescription,
      page,
      perPage,
    );
    const searchedUsers = await searchUsers(query);
    setPage(1);
    const total = calculateTotalPages(searchedUsers.count, perPage);
    setTotalPages(total);
    setSearchResult(searchedUsers.users);
  };

  const handlePageChange = async (pageParam: number) => {
    if (
      usernameRef === null ||
      usernameRef.current === null ||
      usernameRef.current?.value === null ||
      usernameRef.current?.value === undefined ||
      usernameRef.current === undefined
    ) {
      return;
    }
    setPage(pageParam);
    const query = formatSearchQuery(
      selectedHobbies,
      selectedCountries,
      selectedLanguages,
      selectedGender,
      usernameRef.current.value,
      onlyWithDescription,
      pageParam,
      perPage,
    );
    const searchedUsers = await searchUsers(query);
    setSearchResult(searchedUsers.users);
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
          <HobbySelect
            selectedHobbies={selectedHobbies}
            handleHobbySelectChange={handleHobbySelectChange}
            menu={MenuProps}
            possibleHobbies={possibleHobbies}
          />
          <CountrySelect
            selectedCountries={selectedCountries}
            handleCountrySelectChange={handleCountrySelectChange}
            menu={MenuProps}
            possibleCountries={possibleCountries}
          />
          <LanguageSelect
            selectedLanguages={selectedLanguages}
            handleLanguageSelectChange={handleLanguageSelectChange}
            menu={MenuProps}
            possibleLanguages={possibleLanguages}
          />
          <GenderSelect
            selectedGender={selectedGender}
            handleGenderChange={handleGenderChange}
            menu={MenuProps}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleOnlyWithDescriptionChange}
                checked={onlyWithDescription}
              />
            }
            label="Only with description"
          />
          <Button
            variant="contained"
            sx={{ mt: 2, width: "100%" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
        <Box sx={{ flex: 1, ml: 2, overflowY: "auto", height: "100%" }}>
          <SearchResult
            users={searchResult}
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default Search;
