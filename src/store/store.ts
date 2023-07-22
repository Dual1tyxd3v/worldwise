import { ActionType, CitiesType, CityType, InitState } from '../types';

export const initState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

export const reducer = (state: InitState, action: ActionType): InitState => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return {
        ...state,
        cities: action.payload as CitiesType,
        isLoading: false,
      };
    case 'city/added':
      return {
        ...state,
        cities: [...state.cities, action.payload as CityType],
        isLoading: false,
      };
    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter(
          (city) => city.id !== (action.payload as number)
        ),
        isLoading: false,
      };
    case 'currentCity/loaded':
      return {
        ...state,
        currentCity: action.payload as CityType,
        isLoading: false,
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload as string };
    default:
      return initState;
  }
};
