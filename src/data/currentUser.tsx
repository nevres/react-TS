import { createContext, useContext, useReducer } from "react";

export interface User {
  cardNumber: string | undefined;
  userName: string | undefined;
  pin: string | undefined;
  balance: number | undefined;
}

export const emptyUser: User = {
  cardNumber: undefined,
  userName: undefined,
  pin: undefined,
  balance: undefined,
};

export enum ActionType {
  SET = "SET",
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  EMPTY = "EMPTY",
}

export interface Action {
  type: ActionType;
  payload: User;
}

function transactionReducer(state: User, action: Action) {
  if (!state.balance) state.balance = 0;

  const { type, payload } = action;
  if (!payload.balance) payload.balance = 0;

  switch (type) {
    case ActionType.SET:
      return { ...payload };
    case ActionType.DEPOSIT:
      return {
        ...state,
        value: state.balance + payload.balance,
      };
    case ActionType.WITHDRAW:
      return {
        ...state,
        value: state.balance - payload.balance,
      };
    case ActionType.EMPTY:
      return { ...emptyUser };
    default:
      return state;
  }
}

export const CurrentUserContext = createContext<User>(emptyUser);

export const useCurrentUser = () => {
  const [currentUser, dispatch] = useReducer(transactionReducer, {
    ...emptyUser,
  });
  const userContext = useContext(CurrentUserContext);

  return { currentUser, dispatch, userContext } as const;
};