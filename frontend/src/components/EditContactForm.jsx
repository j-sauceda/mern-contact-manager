// load libraries
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact } from '../features/contacts/contactSlice';

function EditContactForm({ contact }) {
  const [modalClass, setModalClass] = useState('modal');
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [relation, setRelation] = useState(contact.relation);

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
    dispatch(updateContact({_id: contact._id, name, phone, email, relation }));
    setName('');
    setPhone('');
    setEmail('');
    setRelation('');
  }

  return (
    <div>
      <button className="button is-warning" onClick={toggleModalClass} >
        <i className="fa-regular fa-pen-to-square"></i>
      </button>

      <div className={modalClass} >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit Contact</p>
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
                  <option value="Relative" >Relative</option>
                  <option value="Friend" >Friend</option>
                  <option value="Coworker" >Coworker</option>
                  <option value="Classmate" >Classmate</option>
                  <option value="Other" >Other</option>
                </select>
              </div>

              <div className='field'>
                <button className='button control is-primary' type='submit'>
                  Submit changes
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export default EditContactForm;