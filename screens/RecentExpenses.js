import { useContext, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { getEarliestDate } from '../util/date';

function RecentExpenses() {
    const { expenses } = useContext(ExpensesContext);
    const [period, setPeriod] = useState(7);
    const [recentExpenses, setRecentExpenses] = useState(expenses.filter(expense => expense.date >= getEarliestDate(7)));

    const changeRecentRange = (numOfDays) => {
        setPeriod(numOfDays);
        setRecentExpenses(expenses.filter(expense => expense.date >= getEarliestDate(numOfDays)));
    };

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title='week' onPress={() => changeRecentRange(7)} />
                <Button title='month' onPress={() => changeRecentRange(30)} />
            </View>
            <ExpensesOutput expenses={recentExpenses} period={period} />
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


