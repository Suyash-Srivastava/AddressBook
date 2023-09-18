import styles from './Disperse.module.css'
import { useDisperse } from './useDisperse'
import ErrorIcon from '../../assets/error.svg'
const Disperse = () => {

    const { inputData, errorMessage, duplicateKeysPresent, setInputData, onSubmit, keepFirstOne, combineBalances } = useDisperse()

    return (
        <div className={styles.maincontainer}>
            <div className={styles.input_region}>
                <div className={styles.info_text}>Addresses with Amounts</div>
                <textarea className={styles.inputbox} value={inputData} spellCheck={false} onChange={(e) => setInputData(e.target.value)} />
                <div className={styles.info_text}>Seperated by ',' or '' or '='</div>
            </div>
            <div className={styles.error_region}>
                {duplicateKeysPresent && <div className={styles.error_resolve_area}>
                    <div className={styles.error_name}>Duplicated</div>
                    <div className={styles.error_resolve_btns}>
                        <div className={styles.resolve_btns} onClick={keepFirstOne}>Keep the first one </div>
                        <div>|</div>
                        <div className={styles.resolve_btns} onClick={combineBalances}>Combine Balance</div>
                    </div>
                </div>}
                {errorMessage.length > 0 && <div className={styles.error_message_area}>
                    <img className={styles.error_icon} src={ErrorIcon} alt="error" />
                    <div className={styles.error_message}>{errorMessage}</div></div>
                }
            </div>
            <button className={styles.next_btn} onClick={onSubmit}>Next</button>
        </div>
    )
}

export default Disperse