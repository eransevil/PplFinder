import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Favorites = ({ toggleFavorite, favoriteList }) => {
    const { users, isLoading, updateCountryList } = usePeopleFetch();
    const [usersForDisplay, setUsersForDisplay] = useState([])

    useEffect(() => {
        const FavUsers = users.filter((user) => {
            return favoriteList.includes(user.email)
        })
        setUsersForDisplay(FavUsers)
    }, [favoriteList])
    return (
        <S.Home>
            <S.Content>
                <S.Header>
                    <Text size="64px" bold>
                        Favorites Users
                    </Text>
                </S.Header>
                <UserList users={usersForDisplay} isLoading={isLoading} onChange={updateCountryList} toggleFavorite={toggleFavorite} favoriteList={favoriteList} isFavPage={true} />
            </S.Content>
        </S.Home>
    );
};

export default Favorites;
