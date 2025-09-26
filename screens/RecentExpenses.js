import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { getEarliestDate } from '../util/date';
import { fetchExpenses } from '../util/http';

function RecentExpenses() {
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const [period, setPeriod] = useState(7);
    const [recentExpenses, setRecentExpenses] = useState([]);
    const content = `No Recent Expenses From The Past ${period} Days`;

    useEffect(() => {
        const getExpenses = () => {
            fetchExpenses().then(res => {
                setExpenses(res);
                setRecentExpenses(res.filter(expense => expense.date >= getEarliestDate(period)));
            });
        };

        getExpenses();
    }, []);

    const changeRecentRange = (numOfDays) => {
        setPeriod(numOfDays);
        setRecentExpenses(expenses.filter(expense => expense.date >= getEarliestDate(numOfDays)));
    };

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title='week' onPress={changeRecentRange.bind(this, 7)} />
                <Button title='month' onPress={changeRecentRange.bind(this, 30)} />
            </View>
            <ExpensesOutput expenses={recentExpenses} period={period} fallbackText={content} />
        </View>
    );
};

export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        backgroundColor: GlobalStyles.colors.primary700
    }
});


