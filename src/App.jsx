import { useState, useEffect } from 'react'

function App() {
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [viajes, setViajes] = useState([])

  useEffect(() => {
    if (!token) return
    fetch('https://wanderlog-i0d8.onrender.com/viajes', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => setViajes(data))
  }, [token])

  const handleLogin = async () => {
    const response = await fetch('https://wanderlog-i0d8.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (response.ok) {
      const data = await response.json()
      setToken(data.token)
    } else {
      setError('Email o contraseña incorrectos')
    }
  }

  if (!token) {
    return (
      <div>
        <h1>WanderLog</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
      </div>
    )
  }

  return (
    <div>
      <h1>Mis viajes</h1>
      {viajes.length === 0 && <p>No hay viajes todavía</p>}
      {viajes.map(v => (
        <div key={v.id}>
          <h3>{v.titulo}</h3>
          <p>{v.descripcion}</p>
        </div>
      ))}
    </div>
  )
}

export default App