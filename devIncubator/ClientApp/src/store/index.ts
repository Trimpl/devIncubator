import * as Calcualtor from './Calculator';

export interface ApplicationState {
    calculator: Calcualtor.CalculatorState | undefined
}

export const reducers = {
    calculator: Calcualtor.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
