import React, { useEffect, useState } from "react";
import UsersList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const USERS = [
    {
      id: "1",
      name: "bob",
      image: "https://dummyimage.com/600x400/000/fff",
      places: 3,
    },
    {
      id: "2",
      name: "bob2",
      image: "https://dummyimage.com/600x400/000/fff",
      places: 8,
    },
    {
      id: "3",
      name: "bob3",
      image: "https://dummyimage.com/600x400/000/fff",
      places: 3,
    },
  ];

  useEffect(() => {
    try {
      const fetchUsers = async () => {
      
        const responseData = await sendRequest("http://localhost:5000/api/users");
      
      
        setLoadedUsers(responseData.users);
      };
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
