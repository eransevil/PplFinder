import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import useInView from "react-cool-inview";


const UserList = ({ users, isLoading, onChange, favoriteList, toggleFavorite, loadMoreUsers, isFavPage }) => {
  const [hoveredUserId, setHoveredUserId] = useState();

  const { observe } = useInView({
    // When the last item comes to the viewport
    onEnter: ({ unobserve, observe }) => {
      // Pause observe when loading data
      unobserve();
      if (!loadMoreUsers) return
      loadMoreUsers().then((res) => {
        observe();
      });
    },
  });

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  return (
    <S.UserList>
      {!isFavPage && <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={onChange} />
        <CheckBox value="AU" label="Australia" onChange={onChange} />
        <CheckBox value="CA" label="Canada" onChange={onChange} />
        <CheckBox value="DE" label="Germany" onChange={onChange} />
        <CheckBox value="DK" label="Denmark" onChange={onChange} />

      </S.Filters>}
      <S.List>
        {users.length && users.map((user, index) => {
          return (

            <S.User ref={index === users.length - 1 ? observe : null}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture?.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper onClick={() => toggleFavorite(user.email)} isVisible={index === hoveredUserId || favoriteList?.includes(user.email)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {!users.length && isFavPage &&
          <Text size="38px">You Dont Have Favorites User yet</Text>
        }
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
