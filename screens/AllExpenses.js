import { StyleSheet, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function AllExpenses() {
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const content = 'No Expenses have added.'

    const getExpenses = () => {
        setIsLoading(true)
        fetchExpenses().then(res => {
            setExpenses(res);
        }).catch(err => {
            setErrorMsg(err.message);
        }).finally(() => {
            setIsLoading(false)
        });
    };

    useEffect(() => {
        getExpenses();
    }, []);

    const errorHandler = () => {
        setErrorMsg(null);
        getExpenses();
    }

    if (errorMsg) {
        return <ErrorOverlay message={errorMsg} onConfirm={errorHandler} />
    }

    if (isLoading) {
        return <LoadingOverlay />
    }

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
