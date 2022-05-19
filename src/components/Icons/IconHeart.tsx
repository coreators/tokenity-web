import React from "react";

function IconHeart({ lineColor = "#5a5a5e" }) {
  return (
    <svg
      id="favorite_border_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
    >
      <path id="패스_10" data-name="패스 10" d="M0,0H48V48H0Z" fill="none" />
      <path
        id="패스_11"
        data-name="패스 11"
        d="M31,3a11.977,11.977,0,0,0-9,4.18A11.977,11.977,0,0,0,13,3,10.893,10.893,0,0,0,2,14c0,7.56,6.8,13.72,17.1,23.08L22,39.7l2.9-2.64C35.2,27.72,42,21.56,42,14A10.893,10.893,0,0,0,31,3ZM22.2,34.1l-.2.2-.2-.2C12.28,25.48,6,19.78,6,14a6.835,6.835,0,0,1,7-7,7.819,7.819,0,0,1,7.14,4.72h3.74A7.769,7.769,0,0,1,31,7a6.835,6.835,0,0,1,7,7C38,19.78,31.72,25.48,22.2,34.1Z"
        transform="translate(2 3)"
        fill={lineColor}
      />
    </svg>
  );
}

export default IconHeart;
