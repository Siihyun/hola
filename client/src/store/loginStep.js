import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalVisible: false,
  currentStep: 0,
  nickName: undefined,
  id: undefined,
  likeLanguages: [],
  position: '',
  workExperience: '',
  organizationIsOpen: false,
  organizationName: '',
  status: [],
};

const loginstepSlice = createSlice({
  name: 'loginStep',
  initialState,
  reducers: {
    nextStep: (state, action) => ({
      ...state,
      currentStep: state.currentStep + 1,
    }),
    previousStep: (state, action) => ({
      ...state,
      currentStep: state.currentStep - 1,
    }),
    clearStep: () => initialState,
    setSignUpUser: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    setSignupInterest: (state, { payload }) => {
      if (state.likeLanguages.includes(payload)) {
        return {
          ...state,
          likeLanguages: state.likeLanguages.filter((item) => item !== payload),
        };
      }
      return {
        ...state,
        likeLanguages: [...state.likeLanguages, payload],
      };
    },
    setSignUpFieldArray: (state, { payload: { key, value } }) => {
      if (state[key].includes(value)) {
        return {
          ...state,
          [key]: state[key].filter((item) => item !== value),
        };
      }
      return {
        ...state,
        [key]: [...state[key], value],
      };
    },
    setModalVisible: (state, action) => ({
      ...state,
      modalVisible: action.payload,
    }),
  },
});

export const {
  nextStep,
  previousStep,
  clearStep,
  setSignUpUser,
  setModalVisible,
  setSignupInterest,
  setSignUpFieldArray,
} = loginstepSlice.actions;
export default loginstepSlice.reducer;
