import { ContactForm } from './ContactsForm/ContactForm';
import { Component } from 'react';
import { ContactList } from './ContactsList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length > this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    if (prevState.contacts.length < this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
