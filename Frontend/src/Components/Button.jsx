import React from 'react';
import styled from 'styled-components';

const Button = ({text, functions}) => {
  return (
    <>
    <StyledWrapper>
      <button onClick={() => functions()} >
        <span className="shadow" />
        <span className="edge" />
        <span className="front text"> {text}
        </span>
      </button>
    </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  button {
   position: relative;
   border: none;
   background: transparent;
   padding: 0;
   cursor: pointer;
   outline-offset: 4px;
   transition: filter 250ms;
   user-select: none;
   touch-action: manipulation;
  }

  .shadow {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   border-radius: 12px;
   background: hsl(0deg 0% 50%);
   will-change: transform;
   transform: translateY(2px);
   transition: transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }

  .edge {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   border-radius: 12px;
   background: linear-gradient(
      to left,
      hsl(0deg 0% 50%) 0%,
      hsl(0deg 0% 70%) 8%,
      hsl(0deg 0% 70%) 92%,
      hsl(0deg 0% 50%) 100%
    );
  }

  .front {
   display: block;
   position: relative;
   padding: 12px 27px;
   border-radius: 12px;
   font-size: 1.1rem;
   color: black;
   background: hsl(0deg 0% 80%);
   will-change: transform;
   transform: translateY(-4px);
   transition: transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }

  button:hover {
   filter: brightness(110%);
  }

  button:hover .front {
   transform: translateY(-6px);
   transition: transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }

  button:active .front {
   transform: translateY(-2px);
   transition: transform 34ms;
  }

  button:hover .shadow {
   transform: translateY(4px);
   transition: transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }

  button:active .shadow {
   transform: translateY(1px);
   transition: transform 34ms;
  }

  button:focus:not(:focus-visible) {
   outline: none;
  }`;

export default Button;