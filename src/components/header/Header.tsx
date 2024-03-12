import { CreationFormSheet } from "../form/CreationFormSheet";

export const Header = () => {
  return (
    <header
      className="fixed top-0 w-full text-white shadow-md z-10 py-[15px]"
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
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              Coconut.
            </h1>

            <CreationFormSheet />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
