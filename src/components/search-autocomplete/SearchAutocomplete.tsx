import React, { useEffect, useState } from "react";
import { UserPropsType } from "./type";

export function SearchAutocomplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  async function fetchListOfUsers() {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      // console.log(data);
      if (data && data.users && data.users.length) {
        setUsers(data.users.map((el: UserPropsType) => el.firstName));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  console.log(users);

  return (
    <div className="search-autocomplete-container">
      <input type="text" name="serch-users" placeholder="Search users..." />
    </div>
  );
}
