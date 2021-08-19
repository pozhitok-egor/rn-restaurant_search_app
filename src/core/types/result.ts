import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { IRestaurant } from "../../Components/Restaurant";

export interface IResult extends IRestaurant {
  id: string;
  name: string;
  image_url: string;
  phone: string;
  rating: number;
  price: string;
  review_count: number;
  categories: Array<{ alias: string, title: string }>;
  coordinates: {
    latitude: number;
    longitude: number;
  }
  url: string;
  is_closed: boolean;
  hours: [
    {
      open: Array<{is_overnight: boolean, start: string, end: string, day: number}>,
      hours_type: string,
      is_open_now: boolean
    }
  ];
  special_hours: Array<{date: string, is_closed: boolean | undefined, start: string, end: string, is_overnight: number}>
  location: { country: string, city: string, address1: string, zip_code: string, state: string }
  photos: Array<string>
}

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'RestaurantShow'>;

type ResultsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RestaurantShow'
>;

export type Props = {
  route: ResultsScreenRouteProp;
  navigation: ResultsScreenNavigationProp;
};

export interface resultState {
  data: IResult | null;
  loading: boolean;
  error: string | null;
}

interface setDataAction {
  type: 'SET_DATA',
  payload: IResult
}

interface setLoadingAction {
  type: 'SET_LOADING'
}

interface setErrorAction {
  type: 'SET_ERROR',
  payload: string
}

export type resultsAction = setDataAction | setLoadingAction | setErrorAction;
