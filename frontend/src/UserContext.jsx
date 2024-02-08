import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedUserAvatar, setSelectedUserAvatar] = useState(() => {
    // Use localStorage to store the user avatar in order to display that specific 
    // user avatar in parts of the application, so the user-related data persists across sessions.
    // If an initial state is not found, default to null.
    return localStorage.getItem("selectedUserAvatar") || null;
  });

  const [selectedUserId, setSelectedUserId] = useState(() => {
    return localStorage.getItem("selectedUserId") || null;
  });

  const setUserAvatar = (avatarUrl) => {
    setSelectedUserAvatar(avatarUrl);
    localStorage.setItem("selectedUserAvatar", avatarUrl);
  };

  const setUserId = (userId) => {
    setSelectedUserId(userId);
    localStorage.setItem("selectedUserId", userId);
  };

  useEffect(() => {
    return () => {
      const selectedAvatarFromStorage =
        localStorage.getItem("selectedUserAvatar");
      if (selectedAvatarFromStorage) {
        setSelectedUserId(selectedAvatarFromStorage);
      }
      const userIdFromStorage = localStorage.getItem("selectedUserId");
      if (userIdFromStorage) {
        setSelectedUserId(userIdFromStorage);
      }
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        selectedUserAvatar,
        setUserAvatar,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
