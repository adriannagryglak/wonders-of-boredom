import styled from "styled-components/macro";
import { media } from "../../styles/MediaQueries";

export const ActivitiesStyled = styled.section`
  position: relative;
  padding: 50px 20px;
  text-align: center;
  z-index: 10;
  max-width: 100%;
  overflow: hidden;
  min-height: ${({ isDisplay }) => (isDisplay ? "none" : "100vh")};
  pointer-events: ${({ isModal }) => isModal ? "none" : "auto"}; 

  p {
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }

  .activites-link__see-more{
    text-align: center;
  }

  ${media.smallScreen} {
    padding: 150px 70px;
  }

  ${media.largeScreen} {
    padding: 100px;
  }

  ::after {
    position: absolute;
    width: ${({ blur }) => (blur)};
    height: ${({ blur }) => (blur)};
    content: "";
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

export const ActivitiesMenusWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px 0;

  ${media.smallScreen} {
    flex-direction: row;
    max-width: 992px;
    margin: 0 auto 50px auto;
  }
`;

export const ActivitiesListStyled = styled.menu`
  font-size: 1.5rem;
  margin: 1.5rem 0;
  cursor: pointer;
  position: relative;
  flex-grow: 1;
  height: 1.5rem;
  list-style-type: none;
  z-index: ${({ top }) => (top ? 10 : 0)};

  li {
    position: absolute;
    top: 0;
    left: 50%;
    transition: transform ease 0.7s;
    padding: 0 1rem;
    width: 90%;
    min-height: 100px;

    &.tags-container {
      display: flex;
      align-items: flex-start;

      div {
        margin: 0 5px;
        padding: 0 10px 3px 10px;
        font-size: 22px;

        :hover {
          font-weight: bold;
        }

        &.active {
          background: white;
          color: black;
          border-radius: 50px;
        }
      }
    }

    :not(:first-child, .tags-container):hover {
      font-weight: bold;
    }

    :first-child {
      text-decoration: underline 1px;
      transform: translateX(-50%);
    }

    :nth-child(2) {
      transform: translate(-50%, 100%);

      @media (min-width: 21.875rem) {
        transform: translate(-50%, 60%);
      }
    }

    :nth-child(3) {
      transform: translate(-50%, 200%);

      @media (min-width: 21.875rem) {
        transform: translate(-50%, 120%);
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
  margin-bottom: 5rem;
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
`;