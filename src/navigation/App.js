import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";

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
                    <img />
                    <p> Reels </p>
                </div>
                <div>
                    <img />
                    <p> Messages </p>
                </div>
                <div>
                    <img />
                    <p> Notifications </p>
                </div>
                <div>
                    <img />
                    <p> Create </p>
                </div>
                <div>
                    <img />
                    <p> Profile </p>
                </div>
            </div>
            <div>
                <img />
                <p> More </p>
            </div>
        </div>
    );
  }