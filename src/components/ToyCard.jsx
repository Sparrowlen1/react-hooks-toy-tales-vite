function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  
  // DELETE: Donate toy
  const handleDelete = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        onDeleteToy(toy.id)
      })
  }

  // PATCH: Like toy (increase likes)
  const handleLike = () => {
    const updatedLikes = toy.likes + 1
    
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: updatedLikes })
    })
      .then(res => res.json())
      .then(updatedToy => {
        onUpdateToy(updatedToy)
      })
  }

  return (
    <div className="toy-card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {'<3'}
      </button>
      <button className="donate-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  )
}

export default ToyCard