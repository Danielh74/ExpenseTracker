import { StyleSheet, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
    const { expenses } = useContext(ExpensesContext);
    const content = 'No Expenses have added.'
    return (
        <View style={styles.container}>
            <ExpensesOutput expenses={expenses} fallbackText={content} />
        </View>
    )
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
