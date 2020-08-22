import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface CalculatorState {
    data: { x: number, y: number }[][]
    maxY: number
    minY: number
}

export interface Calcualtor {
}
interface Request {
    type: 'REQUEST';
}

interface Receive {
    type: 'RECEIVE';
    data: { x: number, y: number }[][]
    maxY: number
    minY: number
}

type KnownAction = Request | Receive;
export const actionCreators = {
    request: (k: number, b: number, c: number, fromX: number, toX: number, step: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        fetch(`calculate?k=${k}&b=${b}&c=${c}&fromX=${fromX}&toX=${toX}&step=${step}`)
            .then(response => response.json() as Promise<{ x: number, y: number }[]>)
            .then(data => {
                let maxY = 0
                let minY = 0
                data.map(data => {
                    if (maxY < data.y) maxY = data.y
                    if (minY > data.y) minY = data.y
                })
                const b = []
                b.push(data)
                dispatch({ type: 'RECEIVE', data: b, maxY: maxY, minY: minY });
                console.log('DATA: ', data)
            });

        dispatch({ type: 'REQUEST' });
    }
};
const unloadedState: CalculatorState = { data: [], maxY: 10, minY: 10 };

export const reducer: Reducer<CalculatorState> = (state: CalculatorState | undefined, incomingAction: Action): CalculatorState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST':
            return {
                ...state
            };
        case 'RECEIVE':
            return {
                data: action.data,
                maxY: action.maxY,
                minY: action.minY
            };
    }
    return state;
};
