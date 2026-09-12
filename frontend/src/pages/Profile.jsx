import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import API from "../api/productApi";

import "../css/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/auth/profile");
      setUser(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  };

  const handleProfileChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.put("/auth/profile", {
        name: user.name,
        email: user.email,
      });

      toast.success(data.message);

      setUser(data.user);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Profile update failed"
      );
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await API.put(
        "/auth/change-password",
        passwordData
      );

      toast.success(data.message);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Password update failed"
      );
    }
  };

  return (
    <div className="profile-page">

      <Sidebar />

      <div className="profile-layout">

        <Topbar
          title="Profile"
          subtitle="Manage your account"
        />

        <main className="profile-main">

          {/* ================= PROFILE HEADER ================= */}

          <section className="profile-header-card">

            <div className="profile-avatar-large">
              {user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

            <div className="profile-header-info">

              <h1>
                {user.name || "User"}
              </h1>

              <p>
                {user.role || "User"}
              </p>

              <span>
                {user.email}
              </span>

            </div>

          </section>


          {/* ================= PROFILE CONTENT ================= */}

          <section className="profile-grid">

            {/* ================= EDIT PROFILE ================= */}

            <div className="profile-card">

              <div className="profile-card-header">

                <div>
                  <h2>
                    Edit Profile
                  </h2>

                  <span>
                    Update your personal information
                  </span>
                </div>

              </div>


              <form
                className="profile-form"
                onSubmit={handleProfileUpdate}
              >

                <div className="profile-group">

                  <label>
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleProfileChange}
                    required
                  />

                </div>


                <div className="profile-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleProfileChange}
                    required
                  />

                </div>


                <div className="profile-group">

                  <label>
                    Role
                  </label>

                  <input
                    type="text"
                    value={user.role}
                    disabled
                  />

                </div>


                <button
                  type="submit"
                  className="profile-primary-btn"
                >
                  Update Profile
                </button>

              </form>

            </div>


            {/* ================= CHANGE PASSWORD ================= */}

            <div className="profile-card">

              <div className="profile-card-header">

                <div>
                  <h2>
                    Change Password
                  </h2>

                  <span>
                    Keep your account secure
                  </span>
                </div>

              </div>


              <form
                className="profile-form"
                onSubmit={handlePasswordSubmit}
              >

                <div className="profile-group">

                  <label>
                    Current Password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={
                      passwordData.currentPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    required
                  />

                </div>


                <div className="profile-group">

                  <label>
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={
                      passwordData.newPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    required
                  />

                </div>


                <div className="profile-group">

                  <label>
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={
                      passwordData.confirmPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    required
                  />

                </div>


                <button
                  type="submit"
                  className="profile-primary-btn"
                >
                  Change Password
                </button>

              </form>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
};

export default Profile;