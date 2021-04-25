import { ISetDeleteItem, ISetTemplates, ISetTemplatesLoader } from '../actions/template.action';
import { SET_DELETE_TEMPLATE, SET_TEMPLATES, SET_TEMPLATES_LOADER } from '../const';

export interface ITemplatesState {
  isLoading: boolean;
  items: ITemplate[];
}

export interface ITemplate {
  authorId: string;
  body: string;
  description: string;
  json: any;
  title: string;
  updatedAt: string;
  createdAt: string;
  _id: string;
}
const initialState: ITemplatesState = {
  isLoading: true,
  items: [],
};
export default function templatesReducer(
  state: ITemplatesState = initialState,
  action: ISetTemplates | ISetTemplatesLoader | ISetDeleteItem
) {
  switch (action.type) {
    case SET_TEMPLATES: {
      state = {
        ...state,
        items: action.payload,
        isLoading: false,
      };
      break;
    }
    case SET_TEMPLATES_LOADER: {
      state = {
        ...state,
        isLoading: action.payload,
      };
      break;
    }
    case SET_DELETE_TEMPLATE: {
      state = {
        ...state,
        items: state.items.filter((i) => i._id !== action.payload),
        isLoading: false,
      };
      break;
    }
    default:
      return state;
  }
  return state;
}
