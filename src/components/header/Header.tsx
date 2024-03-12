import { CreationFormSheet } from "../form/CreationFormSheet";
import { TextLogo } from "../parts/TextLogo";

export const Header = () => {
  return (
    <header
      className="fixed top-0 w-full text-white shadow-md z-10"
      style={{
        background: "#334155",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <nav>
          <div
            className="flex justify-between items-center"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
          >
            <TextLogo />
            <CreationFormSheet />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
