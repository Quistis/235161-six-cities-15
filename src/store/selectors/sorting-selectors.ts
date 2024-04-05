import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCurrentSortingType = (state: State): string => state[NameSpace.Sorting].currentSortType;
