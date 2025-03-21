import React, { useState } from "react";

import Switch from "react-switch";

const AccountPrivacy = () => {
  const [isChecked, setChecked] = useState(false);
  return (
    <React.Fragment>
      <div>
        <h1>Account Privacy</h1>
        <span>
          Account Privacy{" "}
          <Switch
            checked={isChecked}
            onChange={setChecked}
            checkedIcon={false}
            uncheckedIcon={false}
            className="account-switch"
          />
        </span>
        <p>
          When your account is public, anyone can view your profile and posts,
          even without an Instagram account. If your account is private, only
          approved followers can see your content, including posts on hashtag
          and location pages. However, your profile picture and username remain
          visible to everyone.
        </p>
      </div>
    </React.Fragment>
  );
};

export default AccountPrivacy;
