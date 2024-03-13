import React, { ChangeEvent, useEffect, useState } from "react";
import { UserPropsType } from "./type";
import { Suggestions } from "./Suggestions";

export function SearchAutocomplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [searchParam, setSearchParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const query = event.currentTarget.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter(
              (item: string) => item.toLowerCase().indexOf(query) > -1
            )
          : [];
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  function handleClick(event: any) {
    setShowDropdown(false);
    setSearchParam(event.currentTarget.innerText);
    setFilteredUsers([]);
  }

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

  console.log(users, filteredUsers);

  return (
    <div className="search-autocomplete-container">
      {loading ? (
        <h1> Loading data! Please wait </h1>
      ) : (
        <input
          value={searchParam}
          type="text"
          name="serch-users"
          placeholder="Search users..."
          onChange={handleChange}
        />
      )}
      {showDropdown && (
        <Suggestions handleClick={handleClick} users={filteredUsers} />
      )}
    </div>
  );
}
