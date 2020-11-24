import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [cardForm, setCardForm] = useState({})
  
  useEffect(() => {
    window.Omise.setPublicKey(process.env.REACT_APP_OMISE_PUBLIC_KEY)
  }, [])

  const handleFieldChange = (e) => {
    setCardForm({ ...cardForm, [e.target.dataset.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // create omise credit card token
    window.Omise.createToken('card', cardForm, function(statusCode, response) {
      if (statusCode === 200) {
        // Success: send back the TOKEN_ID to your server to create a charge.
        // The TOKEN_ID can be found in `response.id`.
        // do charging process at our server
        axios.post('http://localhost:3001/charge', {
          token: response.id,
          amount: '30000' // 300 Baht
        }).then(response => {
          // charge success
          console.log('response; ', response)
        })
      } else {
        // Error: display an error message.
        alert(response.code + ': ' + response.message)
      }
    })
  }

  return (
    <div className="App">
       <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number</label>
          <input type="text" data-name="number" className="form-control" placeholder="••••••••••••••••" onChange={handleFieldChange} />
        </div>

        <div className="form-group">
          <label>Name on card</label>
          <input type="text" data-name="name" className="form-control" placeholder="Full Name" onChange={handleFieldChange} />
        </div>

        <div className="form-group">
          <label>Expiry date</label>
          <div className="row">
            <div className="col-xs-6">
              <select className="form-control" data-name="expiration_month" onChange={handleFieldChange}>
                <option value="">MM</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className="col-xs-6">
              <select className="form-control" data-name="expiration_year" onChange={handleFieldChange}>
                <option value="">YYYY</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Security code</label>
          <input type="text" data-name="security_code" className="form-control" placeholder="123" onChange={handleFieldChange} />
        </div>

        <div className="form-group">
          <button className="btn btn-primary">Checkout</button>
        </div>

        <input type="hidden" name="omiseToken" />
      </form>
    </div>
  );
}

export default App;
