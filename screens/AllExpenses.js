import { View } from 'react-native'
import { EXPENSES } from '../data/dummy-data'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpenses() {

    return (
        <View>
            <ExpensesOutput expenses={EXPENSES} />
        </View>
    )
}

export default AllExpenses;
