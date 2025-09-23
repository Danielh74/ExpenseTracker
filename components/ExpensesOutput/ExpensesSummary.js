import { Text, View } from 'react-native'

function ExpensesSummary({ expenses, period }) {
    const expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <View>
            {period ? <Text>Last {period} Days</Text> : <Text>Total</Text>}
            <Text>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary