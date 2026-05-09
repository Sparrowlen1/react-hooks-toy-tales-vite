import { useState } from 'react'

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({
    name: '',
    image: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0  // IMPORTANT: Initial likes must be 0
    }

    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(addedToy => {
        onAddToy(addedToy)
        // Reset form after successful submission
        setFormData({ name: '', image: '' })
      })
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Toy name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Toy</button>
      </form>
    </div>
  )
}

export default ToyForm