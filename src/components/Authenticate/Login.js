import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login } from "../../redux/authSlice";

function Login() {
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();

    const newLoginData = {
      email: e.target.elements[0].value,
      password: e.target.elements[1].value,
    };

    console.log(newLoginData);

    dispatch(login(newLoginData));
  }

  return (
    <Container>
      <div id="login__container">
        <h1>Already a member?</h1>
        <form onSubmit={(e) => handleLogin(e)}>
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 90%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

    &>#login__container{
        width: 350px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;

  & > h1 {
    margin-bottom: 10px;
  }

  & > form {
    display: flex;
    flex-direction: column;

    & > input,
    button {
      border-radius: 5px;
      margin-bottom: 10px;
      border: 1px solid rgb(237, 237, 237);
      padding: 10px;
    }

    & > button {
      border: 1px solid black;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
    }

`;

export default Login;
