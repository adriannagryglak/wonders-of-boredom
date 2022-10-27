import { shimmer } from "../../styles/Global";
import styled, { css } from "styled-components/macro";

export const ActivityStyled = styled.div`
  margin: 40px 30px;
  align-self: normal;
  min-width: 200px;
  max-width: 400px;
  flex: 1;
  position: relative;
  cursor: pointer;

  ::after {
    opacity: 0;
    position: absolute;
    z-index: -1;
    content: "";
    height: 25px;
    width: 25px;
    background: linear-gradient(red, transparent),
      linear-gradient(to top left, #9aff00, transparent),
      linear-gradient(to top right, blue, transparent);
    background-blend-mode: screen;
    top: 20%;
    right: 20%;
    border-radius: 50%;
    filter: blur(5px);
    transition: transform ease 1s, opacity ease 0.3s;
  }

  ::before {
    opacity: 0;
    position: absolute;
    z-index: -1;
    content: "";
    height: 10px;
    width: 10px;
    background: #d789db;
    top: 50%;
    right: 50%;
    border-radius: 50%;
    filter: blur(5px);
    transition: transform ease 1s, opacity ease 0.5s;
  }

      &:hover::before {
        opacity: 0.7;
        transform: translateX(var(--random1))
          translateY(var(--random4));
        animation: ${shimmer} 1s 1s ease alternate infinite;
      }

      &:hover::after {
        opacity: 0.7;
        transform: translateX(var(--random2))
          translateY(var(--random3));
        animation: ${shimmer} 1s 1.5s ease alternate infinite;
      }
    

  h2 {
    position: relative;
    text-align: ${({ isDisplay }) => (isDisplay ? "center" : "left")};

    ::after {
      position: absolute;
      z-index: -1;
      content: "";
      height: 25px;
      width: 25px;
      background: linear-gradient(red, transparent),
        linear-gradient(to top left, #9aff00, transparent),
        linear-gradient(to top right, blue, transparent);
      background-blend-mode: screen;
      top: 70%;
      right: 70%;
      border-radius: 50%;
      filter: blur(4px);
      transition: transform ease 0.7s, opacity ease 0.5s;
      opacity: 0;
    }

    ::before {
      position: absolute;
      z-index: -1;
      content: "";
      height: 20px;
      width: 20px;
      background: #b4e097;
      top: 20%;
      right: 10%;
      border-radius: 50%;
      filter: blur(8px);
      transition: transform ease 0.7s, opacity ease 0.3s;
      opacity: 0;
    }


        &:hover::before {
          opacity: 1;
          transform: translateX(var(--random3))
            translateY(var(--random1));
          animation: ${shimmer} 1.5s 1s ease alternate infinite;
        }

        &:hover::after {
          opacity: 1;
          transform: translateX(var(--random4))
            translateY(var(--random2));
          animation: ${shimmer} 2s ease alternate infinite;
        }
      

    ${(props) =>
      props.isActive &&
      css`
        ::after {
          transform: scale(10);
          opacity: 0.8;
        }
      `}
  }
`;