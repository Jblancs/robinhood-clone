import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import { useAccountNavSelect } from '../../context/AccountNav';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const {setSelectedNav} = useAccountNavSelect()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // Event Handlers -----------------------------------------------------------------------------------
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleOnClick = (e, link) => {
    e.preventDefault()
    history.push(`/account/${link}`)
    setSelectedNav(link)
  }

  // className -----------------------------------------------------------------------------------------
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div onClick={openMenu} className={user ? "profile-account-btn bold navhover" : "profile-account-btn bold navhover not-allowed"}>
        Account
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="dropdown-menu-container">
            <div className="prof-drop-section-div bot-border ">
              <div className="prof-drop-text bold">{user.username}</div>
            </div>
            <div className="point prof-drop-section-div" onClick={(e) => handleOnClick(e, "transfers")}>
              <div className="prof-drop-icon">
                <i className="fas fa-university" />
              </div>
              <div className="prof-drop-text bold">
                Transfers
              </div>
            </div>


            <div className="point prof-drop-section-div " onClick={(e) => handleOnClick(e, "history")}>
              <div className="prof-drop-icon">
                <i className="fas fa-history" />
              </div>
              <div className="prof-drop-text bold">
                History
              </div>
            </div>


            <div className="point prof-drop-section-div bot-border" onClick={(e) => handleOnClick(e, "recurring")}>
              <div className="prof-drop-icon">
                <i className="fas fa-sync" />
              </div>
              <div className="prof-drop-text bold">
                Recurring
              </div>
            </div>

            <div className="prof-drop-section-div">
              <div className="prof-drop-icon">
                <i className="fas fa-sign-out-alt" />
              </div>
              <div onClick={handleLogout} className="prof-drop-logout">
                <div className="prof-drop-logout bold" >Log Out</div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            /> */}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
