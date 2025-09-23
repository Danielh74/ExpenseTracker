import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native"
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const { addExpense, deleteExpense, updateExpense, expenses } = useContext(ExpensesContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        deleteExpense(expenseId);
        navigation.goBack();
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = () => {
        if (isEditing) {
            updateExpense(expenseId, { category: 'Bills', description: 'Car insurance', amount: 2249.99, date: new Date('2025-04-07') });
        } else {
            addExpense({ category: 'Bills', description: 'Car insurance', amount: 2249.99, date: new Date('2025-04-07') });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button mode='flat' style={styles.button} onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={24}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            }
        </View>
    )
};

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});