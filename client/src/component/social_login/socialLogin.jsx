import React from 'react';

import SocialLoginDesktop from './desktop/socialLoginDesktop';
import { useMediaQuery } from 'react-responsive';
import SocialLoginMobile from './mobile/socialLoginMobile';

const SocialLogin = ({
  googleOnSuccess,
  googleOnFailure,
  googleClientId,
  kakaoOnSuccess,
  kakaoOnFailure,
  kakaoClientId,
  handleClose,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

  return isMobile ? (
    <SocialLoginMobile
      googleClientId={googleClientId}
      googleOnFailure={googleOnFailure}
      googleOnSuccess={googleOnSuccess}
      kakaoClientId={kakaoClientId}
      kakaoOnSuccess={kakaoOnSuccess}
      kakaoOnFailure={kakaoOnFailure}
      handleClose={handleClose}
    />
  ) : (
    <SocialLoginDesktop
      googleClientId={googleClientId}
      googleOnFailure={googleOnFailure}
      googleOnSuccess={googleOnSuccess}
      kakaoClientId={kakaoClientId}
      kakaoOnSuccess={kakaoOnSuccess}
      kakaoOnFailure={kakaoOnFailure}
      handleClose={handleClose}
    />
  );
};

export default SocialLogin;
