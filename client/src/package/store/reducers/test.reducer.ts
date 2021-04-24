export interface ITestState {
  message: string | null;
}

const initialState = {
  message: null,
};
export default function (state: ITestState = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
