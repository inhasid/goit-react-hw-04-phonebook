import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import FilterInput from "./ContactFiltr/ContactFiltr";

import styles from "./phonebook.module.css";

const Phonebook = () => {
    const [contacts, setContacts] = useState(() => {
        const data = JSON.parse(localStorage.getItem("Phone-book"));
        return data || [];
    });
    const [filter, setFilter] = useState("");

    const firstRender = useRef(true);

    useEffect(() => {
        if (!firstRender.current) {
            localStorage.setItem("Phone-book", JSON.stringify(contacts));
        }
    }, [contacts]);

    useEffect(() => {
        firstRender.current = false;
    }, [])

    const isDuplicate = ({ name }) => {
        const normalizedName = name.toLowerCase();
        
        const duplicate = contacts.find(item => {
            const normalizedCurrentName = item.name.toLowerCase();
            return (normalizedName === normalizedCurrentName);
        })

        return Boolean(duplicate);
    }

    const addContact = (data) => {
        
        if(isDuplicate(data)) {
            return alert(`${data.name} is already in contacts.`);
        }

        setContacts(prevContacts => {
            const newContact = {
                id: nanoid(),
                ...data,
            };
        
            return [...prevContacts, newContact];

        })
    }

    const deleteContact = (id) => {
        setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
    }

    const changeFilter = ({ target }) => setFilter(target.value);

    const getFilteredContacts = () => {
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

    const items = getFilteredContacts();

        return (
            <div className={styles.wrapper}>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={addContact} />
                <h2>Contacts</h2>
                <FilterInput onChange={changeFilter} value={filter} />
                <ContactList items={items} deleteContact={deleteContact} />
            </div>
        )  
}

export default Phonebook;