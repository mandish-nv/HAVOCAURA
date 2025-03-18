import ComputerParts from "./components/computerParts";
import Navbar from "./navbar";

export default function PartsList() {
  return (
    <div>
      <Navbar/>
      <h1 style={{padding:'2rem 0'}}>Computer Parts Store</h1>
      <ComputerParts />
    </div>
  );
}
