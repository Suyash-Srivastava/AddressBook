
import { useState } from 'react'

const useDisperse = () => {

    const [inputData, setInputData] = useState('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [duplicateKeysPresent, setDuplicateKeysPresent] = useState(false)

    function onSubmit() {
        setDuplicateKeysPresent(false)
        setErrorMessage('')
        const inputValue = inputData;

        const eachLineArray: string[] = inputValue?.split('\n')

        const errorMsg = validate(eachLineArray)
        setErrorMessage(errorMsg)


        return
    }

    function validate(eachLine: string[]): string {

        const addresses: string[] = [];
        const amounts: string[] = [];
        for (let i = 0; i < eachLine.length; i++) {
            const [address, amount] = eachLine[i].split(/[ ,;]/)
            addresses.push(address)
            amounts.push(amount)
        }

        const invalidIndexs = checkIfAllAmountValid(amounts)

        if (invalidIndexs.length > 0)
            return 'Line ' + invalidIndexs + ' wrong amount'


        const { duplicateDetected, addressMap } = checkIfDuplicateAddress(addresses)
        if (duplicateDetected === true) {
            setDuplicateKeysPresent(true)
            const errorMsg = []
            for (const [address, indexes] of addressMap) {
                if (indexes.includes(','))
                    errorMsg.push('Address ' + address + ' encountered duplicate in Line : ' + indexes)
            }
            return errorMsg.join(`\n`)
        }
        return ''
    }

    function checkIfAllAmountValid(amounts: string[]): number[] {
        const invalidIndexes = [];
        for (let i: number = 0; i < amounts.length; i++) {
            const amount = amounts[i] ?? '';
            if (amount.match('^[0-9]+$') === null) {
                invalidIndexes.push(i + 1) //actual line number
            }
        }
        return invalidIndexes
    }

    function checkIfDuplicateAddress(addresses: string[]) {
        let duplicateDetected: boolean = false
        const addressMap = new Map();
        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            if (addressMap.has(address) === false) {
                addressMap.set(address, (i + 1) + '')
            }
            else {
                duplicateDetected = true
                const addressValue = addressMap.get(address)
                addressMap.set(address, addressValue + ',' + (i + 1))
            }
        }

        return { duplicateDetected, addressMap }
    }

    function keepFirstOne() {
        const changedInput = operateOnInput(0)
        showDataInUI(changedInput)
    }

    function combineBalances() {
        const changedInput = operateOnInput(1)
        showDataInUI(changedInput)
    }

    function operateOnInput(option: number) {
        const newBook: Map<string, number> = new Map()
        const inputValue = inputData;
        const eachLineArray: string[] = inputValue?.split('\n')
        for (let i = 0; i < eachLineArray.length; i++) {
            const [address, amount] = eachLineArray[i].split(/[ ,;]/)
            if (newBook.has(address) === false) {
                newBook.set(address, parseInt(amount))
            }
            else {
                if (option === 1) {
                    const newamount = parseInt(amount) + newBook.get(address)
                    newBook.set(address, newamount)
                }
                else {
                    continue;
                }
            }
        }

        return (newBook);
    }

    function showDataInUI(changedInput: Map<string, number>) {
        const newInput: string[] = []
        for (const [key, value] of changedInput) {
            newInput.push(key + ' ' + value)
        }

        setInputData(newInput.join('\n'))
    }

    return ({
        inputData,
        errorMessage,
        duplicateKeysPresent,
        setInputData,
        onSubmit,
        keepFirstOne,
        combineBalances,
    });
}

export { useDisperse }