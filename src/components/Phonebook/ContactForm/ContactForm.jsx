import { Component } from "react";
import { nanoid } from "nanoid";

import styles from "./contact-form.module.css";

const INITIAL_STATE = {
    name: "",
    number: "",
};

class ContactForm extends Component {
    contactName = nanoid();
    contactNumber = nanoid();

    state = {...INITIAL_STATE}

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state});
        this.reset();
    }

    reset() {
        this.setState({...INITIAL_STATE});
    }

    render() {
        const { contactName, contactNumber, handleSubmit, handleChange } = this;
        const { name, number } = this.state;

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
}

export default ContactForm;