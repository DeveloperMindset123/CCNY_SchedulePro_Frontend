import React from 'react';
import getWindowDimensions from '@/lib/utils/getWindowDimension';

export const getSignupStyles = () => {
  const [titleFontStyling, setTitleFontStyling] = React.useState<string>('');
  const [secondaryTextStyling, setSecondaryTextStyling] = React.useState<string>('');
  const [emailInputStyling, setEmailInputStyling] = React.useState<string>('');
  const [passwordInputStyling, setPasswordInputStyling] = React.useState<string>('');
  const { width, height } = getWindowDimensions();

  React.useEffect(() => {
    if (width > 600 && height > 700) {
      // ipad styling
      setTitleFontStyling('mt-14 text-white text-[55px] font-serif');
      setSecondaryTextStyling('text-white  text-[35px] text-center px-14 my-7');
      setPasswordInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-2xl p-[10px] rounded-full pl-10'
      );
      setEmailInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-2xl p-[10px] rounded-full pl-10 mt-5'
      );
    } else if (height > 700 && width > 430) {
      // larger phones
      setTitleFontStyling('text-white text-3xl mt-8 font-serif');
      setSecondaryTextStyling('text-white mt-2 text-lg text-center px-8');
      setPasswordInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-lg p-[10px] rounded-full pl-10'
      );
      setEmailInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-lg p-[10px] rounded-full pl-10 mt-8'
      );
    }
    // TODO : bootleg fix
    else if (width === 414) {
      setTitleFontStyling('text-white text-xl mt-4 font-serif text-center');
      setSecondaryTextStyling('text-white mt-1 text-md text-center px-10');
      setPasswordInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[38px] m-[12px] border-spacing-1 text-md rounded-full pl-10'
      );
      setEmailInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-md rounded-full pl-10 mt-6'
      );
    } else {
      setTitleFontStyling('text-white text-2xl mt-6 font-serif');
      //setImagePositionStyling('items-center justify-center mx-auto mt-3');
      setSecondaryTextStyling('text-white mt-1 text-md text-center px-10');
      setPasswordInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[38px] m-[12px] border-spacing-1 text-md rounded-full pl-10'
      );
      setEmailInputStyling(
        'bg-[#2f2f2f] text-[#94a3b8] h-[40px] m-[12px] border-spacing-1 text-md  rounded-full pl-10 mt-6'
      );
    }
  }, [width, height]);

  return {
    titleFontStyling,
    secondaryTextStyling,
    emailInputStyling,
    passwordInputStyling,
  };
};
