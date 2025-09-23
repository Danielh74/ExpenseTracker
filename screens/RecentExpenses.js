import { useState } from 'react';
import { Button, View } from 'react-native'
import { EXPENSES } from '../data/dummy-data';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const changeRecentRange = (numOfDays) => {
    const now = new Date();
    const recentRange = new Date(now.getFullYear(), now.getMonth(), now.getDate() - numOfDays);
    return EXPENSES.filter(expense => expense.date >= recentRange);
};

function RecentExpenses() {
    const [period, setPeriod] = useState(7);
    const [expenseList, setExpenseList] = useState(changeRecentRange(period));

    const onPress = (numOfDays) => {
        setPeriod(numOfDays);
        setExpenseList(changeRecentRange(numOfDays));
    }

    return (
        <View>
            <View>
                <Button title='week' onPress={() => onPress(7)} />
                <Button title='month' onPress={() => onPress(30)} />
            </View>
            <ExpensesOutput expenses={expenseList} period={period} />
        </View>
    )
}

export default RecentExpenses;

