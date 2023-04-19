import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { BiMessageSquareDots } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FiMoreHorizontal } from "react-icons/fi";


export default function Navigation() {
    return (
        <div className="Navigation">
            <p>
                Instagram
            </p>
            <div>
                <div>
                    <GrHomeRounded/>
                    <p> Home </p>
                </div>
                <div>
                    <FiSearch />
                    <p> Search </p>
                </div>
                <div>
                    <MdOutlineExplore />
                    <p> Explore </p>
                </div>
                <div>
                    <BsCameraVideo />
                    <p> Reels </p>
                </div>
                <div>
                    <BiMessageSquareDots />
                    <p> Messages </p>
                </div>
                <div>
                    <AiOutlineHeart />
                    <p> Notifications </p>
                </div>
                <div>
                    <CiSquarePlus />
                    <p> Create </p>
                </div>
                <div>
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