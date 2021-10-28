import React from "react";

function Header() {
  return (
    <div className="flex flex-col justify-center items-center p-6 bg-blue-100 bg-opacity-20 mb-6">
      <p className="text-3xl text-blue-600 font-semibold mb-2 sm:text-5xl">
        React Weather App
      </p>
      <a
        href="https://bhagyamudgal.github.io"
        className="text-md text-black hover:underline"
      >
        Developed by Bhagya Mudgal
      </a>
    </div>
  );
}

export default Header;
