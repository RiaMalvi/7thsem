// src/app/components/Footer.tsx

const Footer = () => {
    return (
      <footer className="bg-black text-gray-400 p-8">
        <div className="container mx-auto grid grid-cols-4 gap-4 px-20">
          {/* Contact Information Section */}
          <div className="px-8">
            <h2 className="text-md font-bold">IIIT Lucknow</h2>
            <address className="not-italic">
              Chak Ganjaria, C.G. City <br />
              Lucknow - 226002 <br />
              <a href="mailto:contact@iiitl.ac.in" className="text-green-500">
                contact@iiitl.ac.in
              </a>
            </address>
          </div>
  
          {/* External Links Section */}
          <div className="px-8 border-l-2 border-gray-500">
            <h3 className="text-md font-bold border-b-2 border-green-500">External Links</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  IIIT Allahabad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  IIIT Coordination Forum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  UPLC
                </a>
              </li>
            </ul>
          </div>
  
          {/* Useful Links Section */}
          <div className="px-8 border-l-2 border-gray-500">
            <h3 className="text-md font-bold border-b-2 border-green-500">Useful Links</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  Course Structure
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  List of Holidays
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  Official Forms & Formats
                </a>
              </li>
            </ul>
          </div>
  
          {/* Quick Links Section */}
          <div className="px-8 border-l-2 border-gray-500">
            <h3 className="text-md font-bold border-b-2 border-green-500">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#" className="hover:text-green-500">
                  Tender <span className="text-red-500">🆕</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  Fee Structure
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  Seat Matrix
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-500 text-sm">
                  RTI
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        {/* Footer Bottom Section */}
        <div className="mt-4 flex justify-between items-center text-gray-500">
          <p>&copy; 2019 IIIT Lucknow</p>
  
          {/* Social Icons */}
          <div className="space-x-4">
            <a href="#" className="hover:text-green-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-green-500">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="hover:text-green-500">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  