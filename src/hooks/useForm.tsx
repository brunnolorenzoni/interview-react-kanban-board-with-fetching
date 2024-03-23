import { useReducer } from "react";

type State = Record<string, boolean>;
type ActionType = "set-error" | "clear";
type Action = {
  type: ActionType;
  inputKey?: string;
};

const initialState: State = {};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "set-error":
      if (!action.inputKey) return state;
      return {
        ...state,
        [action.inputKey]: true,
      };
    case "clear":
      return {};
    default:
      return state;
  }
}

export default function useFormErrors() {
  const [errors, dispatchErrors] = useReducer(reducer, initialState);

  const clearForm = (form: HTMLFormElement) => {
    form.reset();
    dispatchErrors({ type: "clear" });
  };

  return { errors, dispatchErrors, clearForm };
}
