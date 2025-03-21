import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import defaultUser from "../../assets/header/default.png";
import * as Styled from "./style";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../configs/api";

const EditProfile = () => {
  const [context, setContext] = useAppContext();
  const [avatarURL, setAvatarURL] = useState(
    context.profile?.photo || defaultUser
  );
  const [isEdit, setEdit] = useState(false);
  const [bio, setBio] = useState(context.profile?.bio || "");
  const fileUploadRef = useRef();
  const [file, setFile] = useState(null);

  // useEffect(() => {
  //   // Check if the user is authenticated and fetch their profile data
  //   if (context.auth !== null && context.auth.user.id) {
  //     const fetchProfile = async () => {
  //       try {
  //         // Fetch the user profile using a GET request with userId as query param
  //         const response = await axios.get(`${baseUrl}/users/profile`, {
  //           params: { userId: context.auth.user.id }, // Send userId as query parameter
  //         });

  //         if (response.status === 200) {
  //           setAvatarURL(response.data.photo || defaultUser);
  //         //  console.log(`http://localhost:4000${response.data.photo}`)
  //           setBio(response.data.bio || "");  // Set the bio from the response
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user profile:", error);
  //       }
  //     };

  //     fetchProfile();
  //   }
  // }, [context]);

  const handleImageUpload = (event) => {
    setEdit(true);
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const cachedURL = URL.createObjectURL(uploadedFile);
      setAvatarURL(cachedURL); // Temporarily display the uploaded image
    }
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("bio", bio);
    const userId = context.auth?.user?.id; // Assuming userId is stored in context.auth.user
    if (!userId) {
      console.error("User ID not available in context");
      return; // Stop execution if userId is not available
    }
    formData.append("userId", userId);
    if (file) {
      formData.append("photo", file);
    }

    try {
      const response = await api.put(`/users/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Fetch the updated user profile
        const profileResponse = await api.get(`/users/profile`, {
          params: { userId: context.auth.user.id }, // Send the userId as query param
        });

        if (profileResponse.status === 200) {
          const updatedPhoto = profileResponse.data.photo
            ? process.env.REACT_APP_BACKEND_API + profileResponse.data.photo
            : defaultUser;
          const updatedBio = profileResponse.data.bio || "";
          // Update context with the new profile information
          // context.setAuth((prevAuth) => ({
          //   ...prevAuth,
          //   user: {
          //     ...prevAuth.user,
          //     photo: profileResponse.data.photo, // Update the profile photo in the context
          //     bio: profileResponse.data.bio,      // Update the bio in the context
          //   },
          // }));
          toast.success("Profile updated successfully");
          setAvatarURL(updatedPhoto); // Update the avatar URL
          setBio(updatedBio);
          setContext({
            ...context,
            profile: {
              photo: updatedPhoto, // Update the avatar photo in the context
              bio: updatedBio, // Update the bio in the context
            },
          });
          setEdit(false); // Exit edit mode
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <React.Fragment>
      <nav>
        <img src={avatarURL} alt="user-avatar" />
        <form id="form" encType="multipart/form-data">
          <button type="button" onClick={handleImageUpload}>
            Edit Photo
          </button>
          <input
            type="file"
            id="file"
            ref={fileUploadRef}
            onChange={uploadImageDisplay}
            hidden
          />
        </form>
      </nav>
      <div>
        <h1>Edit Profile</h1>
        <span>Bio</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={!isEdit}
        />
        <Styled.EditBtns>
          {isEdit ? (
            <div>
              <button
                onClick={() => setEdit(false)}
                style={{ backgroundColor: "#F6F6F6", color: "black" }}
              >
                Discard
              </button>
              <button onClick={handleSaveProfile}>Save</button>
            </div>
          ) : (
            <button onClick={() => setEdit(true)}>Edit Bio</button>
          )}
        </Styled.EditBtns>
      </div>
    </React.Fragment>
  );
};

export default EditProfile;
