
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function (Component) {
  const Authentication = ({ ...props }) => {
    const { auth } = useSelector((state) => state);

    console.log("AUTH: ", auth)

    if (auth.authGoogle !== null && auth.authGoogle) {
      return <Component {...props} />;
    }

    return <Redirect to="/login" />;
  };

  return Authentication;
}