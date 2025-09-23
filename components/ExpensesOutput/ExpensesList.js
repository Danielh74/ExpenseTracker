import { FlatList } from 'react-native'
import ExpenseItem from './ExpenseItem';

function ExpensesList({ expenses }) {

    const renderExpenseItem = (itemData) => {
        return <ExpenseItem expense={itemData.item} />
    };

    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
    )
}

export default ExpensesList;
