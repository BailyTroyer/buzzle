import React from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authGoogle } from '../../actions/auth';

const GoogleSSO = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSuccess = (response) => {
    const regex = RegExp('(.+)@acvauctions.com');
    if (regex.test(response.profileObj.email)) {
      dispatch(
        authGoogle(
          response.profileObj.email,
          response.tokenId,
          response.profileObj.name,
          response.profileObj.imageUrl,
          true
        )
      );

      history.push('/');
    }
  };

  const onFailure = (response) => {
    console.log('FAILURE: ', response);
  };

  return (
    <GoogleLogin
      clientId="45368284122-qhni9tmcrqj9sov3j8o3f993qhb3j6s0.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
};
export default GoogleSSO;