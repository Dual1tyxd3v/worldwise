export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
};

export type CitiesType = CityType[];

export type CountryType = {
  country: string;
  emoji: string;
};

export type ContextType = {
  cities: CitiesType;
  isLoading: boolean;
  currentCity: CityType | null;
  getCity: (id: number) => void;
  uploadCity: (city: CityType) => void;
  deleteCity: (id: number) => void;
};
