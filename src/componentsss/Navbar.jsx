const Navbar = () => (
  <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-blue-600">Medi-Quest</h1>
    <ul className="flex gap-6 text-gray-600">
      <li><a href="/">Home</a></li>
      <li><a href="#doctors">Doctors</a></li>
      <li><a href="#book">Book</a></li>
      <li><a href="#login">Login</a></li>
    </ul>
  </nav>
);

export default Navbar;