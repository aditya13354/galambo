import { Link } from "react-router-dom";
import Image1 from "../../assets/how/Image1.png";
import Image2 from "../../assets/how/Image2.png";
import Image3 from "../../assets/how/Image3.png";
import Image4 from "../../assets/how/Image4.png";
import Image5 from "../../assets/how/Image5.png";
import Image6 from "../../assets/how/Image6.png";

export const how_data = [
  {
    src: Image1,
    title: "1. Getting Started with Galambo",
    content: (
      <section>
        <div>
          <p>Step 1</p>
          <div>
            <p>Sign Up or Log In</p>
            <p>
              Create a new account or log in if you already have one. Your
              Galambo account allows you to save your searches, create
              collections, and access advanced features.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link rel="canonical" to="/login" className="sign">
              <span>Sign in</span>
            </Link>
            <label style={{ margin: "0 15px" }}>or</label>
            <Link rel="canonical" to="/register" className="register">
              <span>Sign up</span>
            </Link>
          </div>
        </div>
        <div>
          <p>Step 2</p>
          <div>
            <p>Explore the Dashboard</p>
            <p>
              Once logged in, you'll land on your personalized dashboard. Here,
              you can start a new search, view recent searches, and access your
              saved images and collections.
            </p>
          </div>
        </div>
      </section>
    ),
  },
  {
    src: Image2,
    title: "2. Explore the Dashboard",
    content: (
      <p>
        Once logged in, you’ll land on your personalized dashboard. Here, you
        can start a new search, view recent searches, and access your saved
        images and collections.
      </p>
    ),
  },
  {
    src: Image3,
    title: "3. Searching for Images",
    content: (
      <section>
        <div>
          <p>1. Upload or Drag & Drop</p>
          <p>
            Start your search by uploading an image or dragging it into the
            search box. Supported formats include JPG, PNG, and GIF.
          </p>
        </div>
        <div>
          <p>2. Advanced Search Options</p>
          <p>
            Narrow down your results by filtering based on image resolution,
            color, or content type. Use icons representing filters, such as a
            color palette or
          </p>
        </div>
      </section>
    ),
  },
];
