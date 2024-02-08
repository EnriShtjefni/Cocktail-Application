import React, { useState, useEffect } from "react";
import { Card, CardHeader, Avatar, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";
import { fetchUserData } from "../../api";
import "./UserSelectionPage.css";

const UserSelectionPage = () => {
  const { setUserAvatar, setUserId } = useUser();
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchUserData();
        setUserProfiles(data);
    };

    fetchData();
  }, []);

  const handleUserClick = (avatarUrl, userId) => {
    setUserAvatar(avatarUrl);
    setUserId(userId);
  };

  return (
    <div className="cards-container">
      <h2 className="select-profile-title">Select a user profile:</h2>
      <Grid container spacing={3} justifyContent="center">
        {userProfiles?.map((user) => (
          <Grid item key={user.userid}>
            <Link
              to={`/home/${user.userid}`}
              className="link-styles"
              onClick={() => handleUserClick(user.avatarlogolink, user.userid)}
            >
              <Card className="card-container">
                <CardHeader
                  avatar={
                    <Avatar
                      alt={user.username}
                      src={user.avatarlogolink}
                      className="avatar-container"
                    />
                  }
                  title={
                    <Typography variant="h6" className="title-text">
                      {user.username}
                    </Typography>
                  }
                />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserSelectionPage;
