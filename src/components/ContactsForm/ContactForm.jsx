import { Component } from 'react';
import css from './ContactsForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createContact(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <label>Name</label>
          <input
            className={css.inputForm}
            type="text"
            name="name"
            required
            onChange={this.handleChange}
            value={this.state.name}
          />
          <label>Phone</label>
          <input
            className={css.inputForm}
            type="tel"
            name="number"
            required
            onChange={this.handleChange}
            value={this.state.number}
          />
          <button className={css.button}>Add contact</button>
        </form>
      </>
    );
  }
}
