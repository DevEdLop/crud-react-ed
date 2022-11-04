import React, { useState } from 'react'
import Swal from 'sweetalert2'

const Formulario = () => {

  const userForm = {
    id: '',
    name: '',
    lastName: '',
    address: '',
    phone: '',
    city: '',
    country: '',
    gender: ''
  }

  const [users, setUsers] = useState([])
  const [form, setForm] = useState(userForm)

  const handleSubmit = (form) => {
    if (form.id === "") {
      Swal.fire('ERROR!', `la identificacion es obligatoria`, 'error')
      return false
    }
    else if (form.name === "") {
      Swal.fire('ERROR!', `el nombre es obligatorio`, 'error')
      return false
    }
    else if (form.lastName === "") {
      Swal.fire('ERROR!', `el apellido es obligatorio`, 'error')
      return false
    }
    else if (form.address === "") {
      Swal.fire('ERROR!', `la direccion es obligatoria`, 'error')
      return false
    }
    else if (form.phone === "") {
      Swal.fire('ERROR!', `el telefono es obligatorio`, 'error')
      return false
    }
    else if (form.city === "") {
      Swal.fire('ERROR!', `la ciudad es obligatoria`, 'error')
      return false
    }
    else if (form.country === "") {
      Swal.fire('ERROR!', `el pais es obligatorio`, 'error')
      return false
    }
    else if (form.gender === "") {
      Swal.fire('ERROR!', `el genero es obligatorio`, 'error')
      return false
    }
    return true
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (handleSubmit(form)) {
      if (!validateUserById(form.id)) {
        setUsers([...users, form])
        setForm(userForm)
      } else {
        Swal.fire('ERROR!', `el usuario con identificacion ${form.id} ya esta registrado`, 'error')
      }
    }

  }
  const handleDelete = (e, id) => {
    e.preventDefault()
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      icon: 'question',
      iconHtml: '?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.id !== id))
      }

    })

  }

  const handleEdit = (e, id) => {
    e.preventDefault()
    const dataForm = users.find((user) => user.id === id)
    setUsers(users.filter((user) => user.id !== id))
    setForm({
      id: dataForm.id,
      name: dataForm.name,
      lastName: dataForm.lastName,
      address: dataForm.address,
      city: dataForm.city,
      phone: dataForm.phone,
      country: dataForm.country,
      gender: dataForm.gender,
    })
  }

  const validateUserById = (id) => {
    return users.filter((user) => user.id === id).length > 0
  }


  return (
    <div>
      <form>
        <header className="text-center">
          <h1 className="my-4">REGISTRO DE USUARIOS</h1>
        </header>
        <main className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="card card-body">
                <h2 className="card-title text-center">Añadir Usuario</h2>
                <div className="my-2">
                  <label className="form-label">Identificacion</label>
                  <input className="form-control" type="number"
                    value={form.id}
                    name="id"
                    onChange={(e) => setForm({ ...form, id: e.target.value })} />
                </div>
                <div className="my-2">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" type="text"
                    name="first_name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name} />
                </div>
                <div className="my-2">
                  <label className="form-label">Apellido</label>
                  <input className="form-control" type="text"
                    name="last_name"
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    value={form.lastName} />
                </div>
                <div className="my-2">
                  <label className="form-label">Dirección</label>
                  <input className="form-control" type="text"
                    name="address"
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    value={form.address} />
                </div>
                <div className="my-2">
                  <label className="form-label">Telefono</label>
                  <input className="form-control" type="number"
                    name="phone_number"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    value={form.phone} />
                </div>
                <div className="my-2">
                  <label className="form-label">Ciudad</label>
                  <input className="form-control" type="text" name="city"
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    value={form.city} />
                </div>
                <div className="my-2">
                  <label className="form-label">Pais</label>
                  <input className="form-control" type="text"
                    name="country"
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    value={form.country} />
                </div>
                <div className="my-2">
                  <label className="form-label">Genero</label>
                  <select className="form-select" name="gender"
                    id="select_gender"
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                    <option value="" disabled>Seleccione
                      un genero...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="No binario">No binario</option>
                  </select>
                </div>
                <div className="d-flex justify-content-around p-2">
                  <button type="submit" className="btn btn-primary"
                    onClick={handleAdd}>Enviar</button>
                </div>

              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="card card-body overflow-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Cedula</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Dirección</th>
                      <th>Telefono</th>
                      <th>Ciudad</th>
                      <th>Pais</th>
                      <th>Genero</th>
                      <th className='text-center' >acciones</th>
                    </tr>
                  </thead>
                  <tbody id="usersTable">
                    {users.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.lastName}</td>
                          <td>{user.address}</td>
                          <td>{user.phone}</td>
                          <td>{user.city}</td>
                          <td>{user.country}</td>
                          <td>{user.gender}</td>
                          <td>
                            <div className='d-flex justify-content-between'>
                              <button className="btn btn-danger m-1"
                                onClick={(e) => handleDelete(e, user.id)}>Eliminar</button>
                              <button className="btn btn-warning m-1"
                                onClick={(e) => handleEdit(e, user.id)} >Editar</button>
                            </div></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </form>
    </div>
  )
}

export default Formulario
