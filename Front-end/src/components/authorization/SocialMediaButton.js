import React from 'react';
import './SocialMediaButton.css';

const SocialMediaButton = props => {
  return (
    <>
      <button className={props.buttonClassName} onClick={props.onClick}>
        <span className={props.spanClassName}>
          <img className='icon' src={props.imagePath} alt='' />
        </span>
        <span>{props.buttonName}</span>
      </button>
    </>
  );
};

export default SocialMediaButton;
