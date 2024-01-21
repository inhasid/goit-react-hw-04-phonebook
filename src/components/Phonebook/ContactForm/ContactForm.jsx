import { useState } from "react";
import { nanoid } from "nanoid";

import styles from "./contact-form.module.css";

const INITIAL_STATE = {
    name: "",
    number: "",
};

const ContactForm = ({ onSubmit }) => {
    const [state, setState] = useState({...INITIAL_STATE});

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({...state});
        reset();
    }

    const reset = () => {
        setState({...INITIAL_STATE});
    }

    const contactName = nanoid();
    const contactNumber = nanoid();

    const { name, number } = state;

    return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor={contactName}>Name</label>
                    <input value={name} type="text" name="name" required onChange={handleChange} id={contactName} placeholder="Name" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor={contactNumber}>Number</label>
                    <input value={number} type="tel" name="number" required onChange={handleChange} id={contactNumber} placeholder="Number" />
                </div>
                <button type="submit">Add contact</button>
            </form>
        )
}

export default ContactForm;