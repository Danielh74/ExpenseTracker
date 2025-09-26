import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ category, description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { category, description, amount, date }) => { },
    setExpenses: (expenses) => { }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'SET':
            const expensesList = action.payload;
            const orderedList = expensesList.sort((a, b) => b.date.getTime() - a.date.getTime());
            return orderedList;

        case 'ADD':
            return [action.payload, ...state];

        case 'UPDATE':
            const expenseIndex = state.findIndex(expense => expense.id === action.payload.expenseId);
            const updatedExpense = { ...state[expenseIndex], ...action.payload.expenseData };
            const updatedList = [...state];
            updatedList[expenseIndex] = updatedExpense;
            return updatedList;

        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload);

        default:
            return state;
    }
};

function ExpensesContextProvider({ children }) {
    const [expenses, dispatch] = useReducer(expensesReducer, []);

    const setExpenses = (expenses) => {
        dispatch({ type: 'SET', payload: expenses });
    };

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData });
    };

    const deleteExpense = (expenseId) => {
        dispatch({ type: 'DELETE', payload: expenseId });
    };

    const updateExpense = (expenseId, expenseData) => {
        dispatch({ type: 'UPDATE', payload: { expenseId, expenseData } });
    };

    const value = {
        expenses,
        setExpenses,
        addExpense,
        updateExpense,
        deleteExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
