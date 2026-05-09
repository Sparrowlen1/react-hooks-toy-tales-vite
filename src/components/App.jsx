import { useState, useEffect } from 'react'
import ToyContainer from './ToyContainer'  // ← Remove "components/"
import ToyForm from './ToyForm'            // ← Remove "components/"

function App() {
  const [toys, setToys] = useState([])
  const [showForm, setShowForm] = useState(false)

  // GET all toys on page load
  useEffect(() => {
    fetch('http://localhost:3001/toys')
      .then(res => res.json())
      .then(data => setToys(data))
  }, [])

  // POST: Add new toy
  const handleAddToy = (newToy) => {
    setToys([...toys, newToy])
  }

  // DELETE: Remove toy
  const handleDeleteToy = (id) => {
    const updatedToys = toys.filter(toy => toy.id !== id)
    setToys(updatedToys)
  }

  // PATCH: Update toy likes (maintains order)
  const handleUpdateToy = (updatedToy) => {
    const updatedToys = toys.map(toy => 
      toy.id === updatedToy.id ? updatedToy : toy
    )
    setToys(updatedToys)
  }

  return (
    <>
      <header>
        <h1>Andy's Toy Tales</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Add New Toy'}
        </button>
      </header>

      {showForm && <ToyForm onAddToy={handleAddToy} />}

      <ToyContainer 
        toys={toys} 
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  )
}

export default App