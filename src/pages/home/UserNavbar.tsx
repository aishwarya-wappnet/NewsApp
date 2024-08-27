import { useState } from "react";
import { LogIn, LogOut, Plus } from "lucide-react";
import Avatar from "boring-avatars";

import { Button } from "../../components/Buttons";
import Modal from "../../components/Modal";
import Login from "../../components/LoginForm";
import { useUserAuth } from "../../contexts/UserContext";
import Popover from "../../components/Popover";
import CreateArticle from "../../components/ArticleForm";

const UserNavbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateArticlesModal, setShowCreateArticlesModal] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { isAuthenticated, user, logout } = useUserAuth();

  const handleAvatarClick = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const handleLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };

  const handleArticleModal = () => {
    setShowCreateArticlesModal((prev) => !prev);
  };

  return (
    <div>
      {/* Login modal start */}
      <Modal
        show={showLoginModal}
        close={handleLoginModal}
        outsideClose={true}
        width="400px"
        showLogo={true}
      >
        <Login close={handleLoginModal} />
      </Modal>
      {/* Login modal end */}
      {/* Create article modal start*/}
      <Modal
        show={showCreateArticlesModal}
        close={handleArticleModal}
        outsideClose={true}
        title="Create Article"
      >
        <CreateArticle
          close={handleArticleModal}
          user={user}
          initValues={{
            title: "",
            description: "",
            url: "",
            urlToImage: "",
          }}
        />
      </Modal>
      {/* Create article modal end */}
      {!isAuthenticated ? (
        <Button onClick={handleLoginModal}>
          <LogIn width={20} />
          &nbsp; Login
        </Button>
      ) : (
        <div className="flex gap-3">
          <Button onClick={handleArticleModal}>
            <Plus width={20} />
            &nbsp;New Article
          </Button>
          <div className="relative inline-block">
            <div
              className="cursor-pointer"
              onClick={handleAvatarClick}
              role="button"
            >
              <Avatar name={user?.fullName} size={40} variant="beam" square />
            </div>
            <Popover isOpen={isPopoverOpen} onClose={handlePopoverClose}>
              <button
                onClick={() => {
                  setIsPopoverOpen(false);
                  logout();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex justify-start items-center gap-2">
                  <LogOut width={20} /> Logout
                </div>
              </button>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
