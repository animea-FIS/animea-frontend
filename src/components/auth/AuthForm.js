import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  max-width: 410px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  border-bottom: 2px solid #1DD7D5!important;

`;

const Button = styled.button`
  background: linear-gradient(to bottom, #1DB9D7, #BA2BFC);
  border-color: #3f4eae;
  border-radius: 3px;
  padding: 1rem;
  color: white;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  margin-top: 2em;
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 1rem;
  background-color:black
`;

const Error = styled.div`
  background-color: red;
`;

export { Form, Input, Button, Logo, Card, Error };