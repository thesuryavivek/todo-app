const Nav = () => {
  return (
    <header className="py-4 px-6 flex border-b border-zinc-300 shadow-md">
      <Logo />
      <h1 className="text-xl">My Projects</h1>
    </header>
  );
};

function Logo() {
  return (
    <div className="flex items-center space-x-2 w-1/5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.0049 14.6196H8.40343V17.6993H2.0049V14.6196ZM11.6015 14.6196H17.9959V17.6993H11.6015V14.6196ZM2 8.46015H17.9976V11.5399H2V8.46015ZM2.0049 2.30072H11.6031V5.38044H2.0049V2.30072ZM14.8011 2.30072H18V5.38044H14.8011V2.30072Z"
          fill="#263FA0"
        />
      </svg>

      <h1 className="text-xl">Task Boards</h1>
    </div>
  );
}

export default Nav;
