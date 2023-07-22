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

export type AuthContextType = {
  isAuth: boolean;
  user: null | User;
  login: (e: string, p: string) => void;
  logout: () => void;
};

export type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type InitState = {
  cities: CitiesType;
  isLoading: boolean;
  currentCity: CityType | null;
  error: string | null;
};

export type AuthInitState = {
  user: null | User;
  isAuth: boolean;
}

export type AuthActionType = {
  type: string;
  payload?: User;
}

export type ActionType = {
  type: string;
  payload?: CitiesType | CityType | boolean | number | string;
};
