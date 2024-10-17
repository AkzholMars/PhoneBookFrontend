import React from "react";

const FooterComponent = () => {
  return (
    <div>
      <footer class="justify-self-end bg-white text-center text-neutral-600 dark:bg-gray-700 dark:text-neutral-200">
        <div class=" p-6 text-center dark:bg-gray-800 flex justify-center items-center">
          <span>
            Салым Финанс | All Right Reserved &copy; {new Date().getFullYear()}{" "}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
