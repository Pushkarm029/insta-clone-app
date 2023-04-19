import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { BiMessageSquareDots } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FiMoreHorizontal } from "react-icons/fi";
import './App.css';


export default function Navigation() {
    return (
        <div className="navigation">
            <p>
                Instagram
            </p>
            <div>
                <div className="navigation-component">
                    <GrHomeRounded style={{fontSize: '24px' }} />
                    <p> Home </p>
                </div>
                <div className="navigation-component">
                    <FiSearch />
                    <p> Search </p>
                </div>
                <div className="navigation-component">
                    <MdOutlineExplore />
                    <p> Explore </p>
                </div>
                <div className="navigation-component">
                    <BsCameraVideo />
                    <p> Reels </p>
                </div>
                <div className="navigation-component">
                    <BiMessageSquareDots />
                    <p> Messages </p>
                </div>
                <div className="navigation-component">
                    <AiOutlineHeart />
                    <p> Notifications </p>
                </div>
                <div className="navigation-component">
                    <CiSquarePlus />
                    <p> Create </p>
                </div>
                <div className="navigation-component">
                    <CgProfile />
                    <p> Profile </p>
                </div>
            </div>
            <div>
                <FiMoreHorizontal />
                <p> More </p>
            </div>
        </div>
    );
  }