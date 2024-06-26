import { State } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../const';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.Authorization].authStatus;
export const getAuthLoadingStatus = (state: State): boolean => state[NameSpace.Authorization].authLoadingStatus;
