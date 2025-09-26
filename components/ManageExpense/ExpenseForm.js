import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import { useState } from 'react';
import Button from '../UI/Button';
import { getDateString } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, initialData }) {
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [inputs, setInputs] = useState({
        amount: {
            value: initialData?.amount.toString() || '',
            isValid: true
        },
        date: {
            value: initialData ? getDateString(initialData.date) : '',
            isValid: true
        },
        category: {
            value: initialData?.category || '',
            isValid: true
        },
        description: {
            value: initialData?.description || '',
            isValid: true
        }
    });

    const inputChangeHandler = (inputName, enteredValue) => {
        setInputs(prev => ({ ...prev, [inputName]: { value: enteredValue, isValid: true } }));
    };

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            category: inputs.category.value,
            description: inputs.description.value
        };

        const validation = {
            amount: !isNaN(expenseData.amount) && expenseData.amount > 0,
            date: !isNaN(expenseData.date.getTime()),
            category: expenseData.category.trim().length > 0,
            description: expenseData.description.trim().length > 0
        };

        setInputs(prev => {
            const updatedInputs = {};
            for (const key in prev) {
                updatedInputs[key] = {
                    ...prev[key],
                    isValid: validation[key]
                };
            }
            return updatedInputs;
        });

        if (!Object.values(validation).every(Boolean)) {
            setIsFormInvalid(true);
            return;
        }

        onSubmit(expenseData);
    };


    return (
        <View>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    style={styles.rowInput}
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputs.amount.value
                    }}
                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputs.date.value
                    }}
                />
            </View>
            <Input
                label="Category"
                invalid={!inputs.category.isValid}
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'category'),
                    value: inputs.category.value
                }}
            />
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
            {isFormInvalid && <Text style={styles.errorMessage}>Invalid input values - please check your entered data.</Text>}
            <View style={styles.buttonsContainer}>
                <Button mode='flat' style={styles.button} onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1,
        maxWidth: '50%'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
        marginVertical: 8
    },
    errorMessage: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
        padding: 6
    }
});