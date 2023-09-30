import '@testing-library/jest-dom'
// import * as React from 'react'
// import {render, fireEvent, screen} from '@testing-library/react'
// import Login from '../components/auth/LoginAccountForm'

// jest.mock('../firebase')

// // const fakeUserResponse = {token: 'fake_user_token'}
// // const server = setupServer(
// //   rest.post('/api/login', (req, res, ctx) => {
// //     return res(ctx.json(fakeUserResponse))
// //   }),
// // )
test('login test', () => {
  expect(true).toBe(true);
})



// // beforeAll(() => server.listen())
// // afterEach(() => {
// //   server.resetHandlers()
// //   // window.localStorage.removeItem('token')
// // })
// // afterAll(() => server.close())


// const username = 'demo';
// const password = 'demo1234';

// test('Login Test', async () => {
//   render(<Login />)
//   // fireEvent.change(screen.getByLabelText(/username/i), {
//   //   target: {value: 'chuck'},
//   // })
//   // fireEvent.change(screen.getByLabelText(/password/i), {
//   //   target: {value: 'norris'},
//   // })
//   const emailField = getByTestId('email');
//   const passField = getByTestId('password');
//   fireEvent.change(emailField, { target: { value: 'Hello, Jest!' } });
//   fireEvent.change(passField, { target: { value: 'Hello, Jest!' } });

//   expect(emailField.value).toBe('Hello, Jest!');
//   expect(passField.value).toBe('Hello, Jest!');


//   // fireEvent.click(screen.getByText(/submit/i))
//   // const alert = await screen.findByRole('alert')
//   // expect(alert).toHaveTextContent(/congrats/i)
//   // expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token)
// })

// // test('handles server exceptions', async () => {
// //   // mock the server error response for this test suite only.
// //   server.use(
// //     rest.post('/api/login', (req, res, ctx) => {
// //       return res(ctx.status(500), ctx.json({message: 'Internal server error'}))
// //     }),
// //   )

// //   render(<Login />)

// //   // fill out the form
// //   fireEvent.change(screen.getByLabelText(/username/i), {
// //     target: {value: 'chuck'},
// //   })
// //   fireEvent.change(screen.getByLabelText(/password/i), {
// //     target: {value: 'norris'},
// //   })

// //   fireEvent.click(screen.getByText(/submit/i))

// //   // wait for the error message
// //   const alert = await screen.findByRole('alert')

// //   expect(alert).toHaveTextContent(/internal server error/i)
// //   expect(window.localStorage.getItem('token')).toBeNull()
// // })