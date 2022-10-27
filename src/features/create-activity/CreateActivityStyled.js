import styled from "styled-components/macro";
import { media } from "../../styles/MediaQueries";
import { flicker } from "../../styles/Global";

export const CreateActivityStyled = styled.section`
  min-height: 100vh;
  position: relative;
  padding: 100px 40px;
  text-align: center;

  h1 {
    position: relative;
    z-index: 10;
  }

  ${media.tablet} {
    padding: 150px 70px;
  }

  ${media.largeScreen} {
    padding: 150px;
  }
`;

export const CreatingFormStyled = styled.form`
  margin: 90px auto;
  position: relative;
  max-width: 500px;

  div {
    position: relative;
    margin-bottom: 30px;

    &.category-choice {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      ${media.tablet} {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .creating-form--yes-no{
      margin: 0;
      display: flex;
      justify-content: space-between;
      width: 80px;

      span{
        cursor: pointer;
      }
    }

    label {
      font-family: var(--nanum);
      font-size: 18px;
      transition: all 0.5s ease;
     
      &.for-text-input {
        position: absolute;
        top: 0;
        left: 0;
      }

      ${media.tablet} {
        font-size: 20px;
      }
    }

    input[type="text"] {
      background: none;
      padding-bottom: 2px;
      outline: none;
      border: none;
      border-bottom: 1px solid white;
      color: white;
      width: 100%;
      font-family: var(--nanum);
      font-size: 20px;

      :focus,
      :valid {
        + label {
          transform: translateY(-20px);
          font-size: 12px;
        }
      }

      ${media.tablet} {
        padding-bottom: 5px;
      }
    }

    input[type="checkbox"] {
      appearance: none;
      background-color: inherit;
      color: white; 
      width: 1.15em;
      height: 1.15em;
      border: 1px solid white;
      position: relative;

      ::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        top: 10%;
        left: 70%;
        border-right: 2px solid white;
        border-bottom: 2px solid white;
        transform: translate(-50%, -50%) scale(0) rotate(50deg);
      }

      :checked::before{
        transform: translate(-50%, -50%) rotate(50deg) scale(1.1);
      }
    }

    ul{
      display: flex;
      justify-content:center;

      li{
        margin: 10px 5px;
        cursor: pointer;
        text-transform: uppercase;
      }
    }

  }

  button {
    text-transform: uppercase;
    background: none;
    color: white;
    border: 1px solid white;
    padding: 10px;
    font-family: var(--cormorant);
    cursor: pointer;
    margin-top: 60px;

    :hover {
      font-weight: bolder;
    }

    ${media.tablet} {
      font-size: 18px;
    }
  }

  .creating-form--send-message{
    font-size: 20px;
    font-family: var(--nanum);
    margin-bottom: 30px;

    ${media.tablet} {
      font-size: 24px;
    }
  }

  .creating-form--error{
    margin-top: 60px;
    font-size: 20px;
    animation: ${flicker} 1.5s ease-in infinite alternate;
  }
`;

export const CreateActivityLinkWrapperStyled = styled.section`
  z-index: 10;
  position: relative;
  padding: 100px 20px;
  transform: translateX(-100%);

  ${media.tablet} {
    padding: 150px 70px;
  }

  ${media.largeScreen} {
    padding: 150px;
  }

  p {
    font-family: var(--nanum);
    font-size: 30px;
    margin-bottom: 5rem;

    ${media.largeScreen} {
      text-align: center;
    }
  }

  a {
    text-align: center;
  }
`;
