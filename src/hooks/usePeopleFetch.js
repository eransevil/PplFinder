import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (props) => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('usersList')) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [countryList, setCountryList] = useState([])
  const [usersForDisplay, setUsersForDisplay] = useState([])

  useEffect(() => { //SET users to local Storage
    localStorage.setItem('usersList', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    fetchUsers()
    filterByCountry(); //for the first time
  }, [users])


  useEffect(() => { //filter by contry every time the country list change
    filterByCountry()
  }, [countryList]);

  const updateCountryList = (contry) => { //update the counrty list every time the user click on the checkbox
    const countryListClone = [...countryList]
    const idx = countryListClone.findIndex(contryItem => contryItem === contry)
    idx === -1 ? countryListClone.push(contry) : countryListClone.splice(idx, 1)
    setCountryList(countryListClone)
  }

  const filterByCountry = () => {
    if (countryList?.length) {
      const filterdUsers = users.filter((user) => { return countryList.includes(user.nat) })
      setUsersForDisplay(filterdUsers)
    } else {
      setUsersForDisplay(users)
    }
  }
  async function fetchUsers() {
    if (users.length) return
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setIsLoading(false);
    setUsers(response.data.results);
  }

  const loadMoreUsers = async () => {
    if (countryList.length) return
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    const cloneUsers = [...users]
    const combinedArray = cloneUsers.concat(response.data.results);
    setUsers(combinedArray)

    return Promise.resolve('finish123')
  }

  return { users, isLoading, usersForDisplay, updateCountryList, loadMoreUsers };
};
