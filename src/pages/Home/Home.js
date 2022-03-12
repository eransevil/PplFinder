import React, { useEffect } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = ({ toggleFavorite, favoriteList }) => {
  const { usersForDisplay, isLoading, updateCountryList, loadMoreUsers } = usePeopleFetch();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={usersForDisplay} isLoading={isLoading} onChange={updateCountryList} toggleFavorite={toggleFavorite} favoriteList={favoriteList} loadMoreUsers={loadMoreUsers} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
