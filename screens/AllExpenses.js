import { StyleSheet, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../util/http';

function AllExpenses() {
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const content = 'No Expenses have added.'

    useEffect(() => {
        const getExpenses = () => {
            fetchExpenses().then(res => {
                setExpenses(res);
            });
        };

        getExpenses();
    }, [])
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
