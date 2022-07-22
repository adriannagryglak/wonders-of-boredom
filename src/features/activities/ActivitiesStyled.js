import styled from "styled-components";
import { media } from "../../styles/MediaQueries";
import { shimmer } from "../../styles/Global";

export const ActivitiesStyled = styled.section`
  position: relative;
  padding: 100px 10px;
  text-align: center;
  z-index: 10;
  max-width: 100%;
  overflow: hidden;
  opacity: 0;

  h1{
    font-family: var(--cormorant);
    font-size: 1.5rem;
  }

  ${media.smallScreen} {
    padding: 100px 40px;
  }
`;

export const ActivitiesListStyled = styled.ul`
  font-family: var(--cormorant);
  font-size: 1.5rem;
  margin: 1.5rem 0 7rem;
  cursor: pointer;
  position: relative;
  width: auto;
  height: 1.5rem;

  li {
    position: absolute;
    top: 0;
    left: 50%;
    transition: transform ease 0.7s;
    padding: 0 1rem;
    width: 90%;
    min-height: 100px;

    :first-child {
      text-decoration: underline 1px;
      transform: translateX(-50%);

      ${media.tablet} {
        width: 50%;
      }
      ${media.smallScreen} {
        width: unset;
      }
    }

    :nth-child(2) {
      transform: translate(-50%, 100%);

      @media (min-width: 21.875rem) {
        transform: translate(-50%, 60%);
      }

      :hover {
        font-weight: bold;
      }
    }

    :nth-child(3) {
      transform: translate(-50%, 200%);

      @media (min-width: 21.875rem) {
        transform: translate(-50%, 120%);
      }

      :hover {
        font-weight: bold;
      }
    }

    &.closed {
      transform: translate(-50%, 0);
      opacity: 0;
      pointer-events: none;
    }
  }
`;

export const ActivitiesWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: -1;
  justify-content: center;
  align-items: center;
  font-family: var(--nanum);
  font-weight: 300;
  font-size: 1rem;
  text-align: left;
  transition: all ease 0.7s;
  opacity: ${(props) => (props.menuOpen ? 0.5 : 1)};
  filter: blur(${(props) => (props.menuOpen ? 5 : 0)}px);

  a {
    padding-top: 7rem;
    font-family: var(--cormorant);
    font-size: 1.5rem;
    cursor: pointer;
    width: 100%;
    text-align: center;

    :hover {
      font-weight: bold;
    }
  }
`;

export const ActivityStyled = styled.div`
  margin: 40px 30px;
  align-self: normal;
  min-width: 200px;
  max-width: 400px;
  flex: 1;
  position: relative;

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

  :hover::before {
    opacity: 0.7;
    transform: translateX(${({ random }) => random[0]}px)
      translateY(${({ random }) => random[3]}px);
    animation: ${shimmer} 1s 1s ease alternate infinite;
  }

  :hover::after {
    opacity: 0.7;
    transform: translateX(${({ random }) => random[1]}px)
      translateY(${({ random }) => random[2]}px);
    animation: ${shimmer} 1s 1.5s ease alternate infinite;
  }

  h2 {
    position: relative;

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

    :hover::before {
      opacity: 1;
      transform: translateX(${({ random }) => random[2]}px)
        translateY(${({ random }) => random[0]}px);
      animation: ${shimmer} 1.5s 1s ease alternate infinite;
    }
    :hover::after {
      opacity: 1;
      transform: translateX(${({ random }) => random[3]}px)
        translateY(${({ random }) => random[1]}px);
      animation: ${shimmer} 2s ease alternate infinite;
    }
  }
`;
