import { Boombox } from "react-bootstrap-icons";
import { VinylFill } from "react-bootstrap-icons";
import { Box2Heart } from "react-bootstrap-icons";
function AboutPage() {
  return (
    <div>
      <h1>Welcome to my music app!</h1>
      <p>This page was created by Bente Hjort.</p>
      <p>I hope you'll enjoy browsing my collection!</p>
      <div className="d-flex justify-content-center gap-4 mt-5">
        <Boombox size={200} />
        <VinylFill size={200} className="mx-3" />
        <Box2Heart size={200} />
      </div>
    </div>
  );
}
export default AboutPage;
