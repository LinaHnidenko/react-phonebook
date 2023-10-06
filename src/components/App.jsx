import { ContactForm } from './ContactsForm/ContactForm';
import { Component } from 'react';
import { ContactList } from './ContactsList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  createContact = data => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name === data.name)) {
      return Notify.warning(`Oops! ${data.name} is already in your list`);
    }

    const newContact = {
      ...data,
      id: nanoid(),
    };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  onFilterChange = ev => {
    this.setState({ filter: ev.currentTarget.value });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerFilter)
    );
  };

  deleteContactFromList = id => {
    console.log(id);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const filteredContacts = this.filterContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm createContact={this.createContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.onFilterChange} />
        {this.state.contacts.length ? (
          <ContactList
            contacts={filteredContacts}
            deleteContactFromList={this.deleteContactFromList}
          />
        ) : (
          <p>There are no contacts in your list</p>
        )}
      </div>
    );
  }
}
