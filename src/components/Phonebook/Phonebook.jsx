import { Component } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import FilterInput from "./ContactFiltr/ContactFiltr";

import styles from "./phonebook.module.css";

class Phonebook extends Component {
    state = {
        contacts: [],
    filter: ""
    }

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem("Phone-book:"));
        if (contacts?.length) {
            this.setState({
                contacts,
            })
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        const { contacts } = this.state;
        if (prevState.contacts.length !== contacts.length) {
            localStorage.setItem("Phone-book:", JSON.stringify(this.state.contacts));
        }
    }    

    isDuplicate({ name }) {
        const { contacts } = this.state;
        const normalizedName = name.toLowerCase();
        
        const duplicate = contacts.find(item => {
            const normalizedCurrentName = item.name.toLowerCase();
            return (normalizedName === normalizedCurrentName);
        })

        return Boolean(duplicate);
    }


    addContact = (data) => {
        
        if(this.isDuplicate(data)) {
            return alert(`${data.name} is already in contacts.`);
        }

        this.setState(({ contacts }) => {
            const newContact = {
                id: nanoid(),
                ...data,
            }
        
            return {
                contacts: [...contacts, newContact]
            } 
        })
    }

    deleteContact = (id) => {
        this.setState(({ contacts }) => {
            const newContacts = contacts.filter(item => item.id !== id);

            return {
                contacts: newContacts,
            }
        })
    }

    changeFilter = ({target})=> {
        this.setState({
            filter: target.value
        })
    }

    getFilteredContacts() {
        const {filter, contacts} = this.state;
        if(!filter) {
            return contacts;
        }

        const normalizedFilter = filter.toLowerCase();

        const filteredContacts = contacts.filter(({name}) => {
            const normalizedName = name.toLowerCase();

            return (normalizedName.includes(normalizedFilter))
        });

        return filteredContacts;
    }

    render() {
        //const { contacts } = this.state;
        const { addContact, deleteContact, changeFilter } = this;
        const contacts = this.getFilteredContacts();

        return (
            <div className={styles.wrapper}>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={addContact} />
                <h2>Contacts</h2>
                <FilterInput onChange={changeFilter} value={this.state.filter} />
                <ContactList items={contacts} deleteContact={deleteContact} />
            </div>
        )
    }
}

export default Phonebook;