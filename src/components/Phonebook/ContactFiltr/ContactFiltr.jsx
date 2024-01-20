import styles from "./contact-filtr.module.css";

const FilterInput = ({ onChange, value }) => {
    return (
        <input
            onChange={onChange}
            name="filter"
            placeholder="Search"
            className={styles.input}
            value={value} />
    )
}

export default FilterInput;