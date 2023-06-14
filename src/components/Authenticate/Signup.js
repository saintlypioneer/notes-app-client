import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signup } from "../../redux/authSlice";

function Signup() {
  const dispatch = useDispatch();

  function handleSignup(e) {
    e.preventDefault();
  
    if (e.target.elements[2].value !== e.target.elements[3].value) {
      alert("Passwords do not match!");
      return;
    }
  
    const newSignupData = {
      name: e.target.elements[0].value,
      email: e.target.elements[1].value,
      password: e.target.elements[2].value,
    };
  
    console.log(newSignupData);
  
    dispatch(signup(newSignupData));
  }

  return (
    <Container>
      <div id="signup__container">
      <h1>Wanna join us?</h1>
                    <form onSubmit={e => handleSignup(e)}>
                        <input name='name' type="text" placeholder="Username" />
                        <input name='email' type="email" placeholder="Email" />
                        <input name='password' type="password" placeholder="Password" />
                        <input name='confirmPassword' type="password" placeholder="Confirm Password" />
                        <button type="submit">Sign-Up</button>
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

  & > #signup__container {
    width: 350px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;

    &>h1{
        margin-bottom: 10px;
    }

    &>form{
        display: flex;
        flex-direction: column;

        &>input, button{
            border-radius: 5px;
            margin-bottom: 10px;
            border: 1px solid rgb(237, 237, 237);
            padding: 10px;
        }

        &>button{
            border: 1px solid black;
            transition: all 0.3s ease-in-out;

            &:hover{
                background-color: black;
                color: white;
            }
        }
    }
  }
`;

export default Signup;
