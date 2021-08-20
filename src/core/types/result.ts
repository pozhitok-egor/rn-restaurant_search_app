import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { IPlace } from "./Place";

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
  data: IPlace | null;
  loading: boolean;
  error: string | null;
}

interface setDataAction {
  type: 'SET_DATA',
  payload: IPlace
}

interface setLoadingAction {
  type: 'SET_LOADING'
}

interface setErrorAction {
  type: 'SET_ERROR',
  payload: string
}

export type resultsAction = setDataAction | setLoadingAction | setErrorAction;
