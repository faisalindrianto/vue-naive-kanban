import mock from '../mock'

const data = {
  users: [
    {
      id: 1,
      name: 'User',
      email: 'user@example.com',
      password: 'user',
    },
    {
      id: 2,
      name: 'Faisal Indrianto',
      email: 'faisal@example.com',
      password: 'faisal',
    },
  ]
}

mock.onPost('/auth/login').reply(request => {
  const { email, password } = JSON.parse(request.data)

  const user = data.users.find(u => u.email === email && u.password === password)

  if (user) {
    return [200, {
      message: 'success login!',
      data: user,
    }]
  }

  return [400, { message: 'email or password is invalid' }]
})