import { View } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'

function ExpensesOutput({ expenses, period }) {
    return (
        <View>
            <ExpensesSummary expenses={expenses} period={period} />
            <ExpensesList expenses={expenses} />
        </View>
    )
}

export default ExpensesOutput