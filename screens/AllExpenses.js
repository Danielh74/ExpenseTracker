import { StyleSheet, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
    const { expenses } = useContext(ExpensesContext);
    return (
        <View style={styles.container}>
            <ExpensesOutput expenses={expenses} />
        </View>
    )
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
