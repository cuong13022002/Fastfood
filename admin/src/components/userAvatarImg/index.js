import React, { useContext } from "react";

import { MyContext } from "../../App";

const UserAvatarImg = (props) => {
  const context = useContext(MyContext);
  return (
    <div className="userImg">
      <span className="rounded-circle">{context.user?.name?.charAt(0)}</span>
    </div>
  );
};

export default UserAvatarImg;
