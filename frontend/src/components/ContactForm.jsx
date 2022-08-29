// load libraries
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../features/contacts/contactSlice';

function ContactForm() {
  const [modalClass, setModalClass] = useState('modal');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('Relative');

  const toggleModalClass = () => {
    if (modalClass === 'modal') {
      setModalClass('modal is-active');
    }
    else {
      setModalClass('modal');
    }
  }

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createContact({ name, phone, email, relation }));
    setName('');
    setPhone('');
    setEmail('');
    setRelation('');
  }

  return (
    <div>
      <button className="button is-block is-primary is-large is-fullwidth" onClick={toggleModalClass} >
        Add new contact
      </button>

      <div className={modalClass} >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add Contact</p>
            <button className="delete" aria-label="close" onClick={toggleModalClass} ></button>
          </header>
          <section className="modal-card-body has-text-centered">
            <form onSubmit={onSubmit}>
              <div className='field'>
                <label htmlFor='text'>Name&nbsp;</label>
                <input
                  className='control'
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='field'>
                <label htmlFor='text'>Phone&nbsp;</label>
                <input
                  className='control'
                  type='text'
                  name='phone'
                  id='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className='field'>
                <label htmlFor='text'>Email&nbsp;</label>
                <input
                  className='control'
                  type='text'
                  name='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='field'>
                <label htmlFor='text'>Relation&nbsp;</label>
                <select
                  className='control'
                  required
                  name='relation'
                  id='relation'
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                >
                  <option value="Relative" defaultValue>Relative</option>
                  <option value="Friend" >Friend</option>
                  <option value="Coworker" >Coworker</option>
                  <option value="Classmate" >Classmate</option>
                  <option value="Other" >Other</option>
                </select>
              </div>

              <div className='field'>
                <button className='button control is-primary' type='submit'>
                  Add Contact
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ContactForm;