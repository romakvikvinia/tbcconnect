import { IAuthToken } from '../../../interfaces/auth.interface';
import { IClearUserCredentials, ISetUserCredentials, ISetUserCredentialsLoader } from '../actions/user.action';
import { CLEAR_USER_CREDENTIALS, SET_USER_CREDENTIALS, SET_USER_CREDENTIALS_LOADER } from '../const/user.const';

export interface IUserState extends IAuthToken {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: IUserState = {
  isAuthenticated: false,
  isLoading: false,
  token: '',
  expiresIn: 0,
};
export default function userReducer(
  state: IUserState = initialState,
  action: ISetUserCredentials | ISetUserCredentialsLoader | IClearUserCredentials
) {
  switch (action.type) {
    case SET_USER_CREDENTIALS: {
      state = {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
      break;
    }
    case SET_USER_CREDENTIALS_LOADER: {
      state = {
        ...state,
        isLoading: action.payload,
      };
      break;
    }
    case CLEAR_USER_CREDENTIALS: {
      state = {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: '',
        expiresIn: 0,
      };
      break;
    }
    default:
      return state;
  }
  return state;
}
