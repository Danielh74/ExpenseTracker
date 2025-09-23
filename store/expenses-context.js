import { createContext, useReducer } from "react";

const EXPENSES = [
    { id: 1, description: 'Sushi', amount: 49.99, date: new Date("2025-08-25"), category: 'Food' },
    { id: 2, description: 'Shoes', amount: 449.99, date: new Date("2025-09-20"), category: 'Clothes' },
    { id: 3, description: 'Electricity', amount: 219.99, date: new Date("2024-09-10"), category: 'Bills' },
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ category, description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { category, description, amount, date }) => { }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ id, ...action.payload }, ...state];

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
    const [expenses, dispatch] = useReducer(expensesReducer, EXPENSES);

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: { ...expenseData, date: new Date(expenseData.date) } });
    };

    const deleteExpense = (expenseId) => {
        dispatch({ type: 'DELETE', payload: expenseId });
    };

    const updateExpense = (expenseId, expenseData) => {
        dispatch({ type: 'UPDATE', payload: { expenseId, expenseData } });
    };

    const value = {
        expenses,
        addExpense,
        updateExpense,
        deleteExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
