import { FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="w-full my-5">
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 w-full">
        <div className="w-full p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://github.com/nguoingoaihanhtinh" className="hover:underline">
              KhoaKhung&apos;
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href="https://www.facebook.com/khoakhungvl/?locale=vi_VN" className="hover:underline">
                Contact
              </a>
              <FaFacebook />
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
