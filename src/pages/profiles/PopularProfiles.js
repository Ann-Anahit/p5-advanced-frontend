import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
    const [profileData, setProfileData] = useState({
        // we will use the pageProfile later!
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });
    const { popularProfiles } = profileData;
    const currentUser = useCurrentUser();

    const handleFollow = async (profile) => {
        try {
            const { data } = await axiosReq.post("/follows/", { followed: profile.id });
            setProfileData((prevState) => ({
                ...prevState,
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((p) =>
                        p.id === profile.id ? { ...p, following_id: data.id } : p
                    ),
                },
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnfollow = async (profile) => {
        try {
            await axiosReq.delete(`/follows/${profile.following_id}/`);
            setProfileData((prevState) => ({
                ...prevState,
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((p) =>
                        p.id === profile.id ? { ...p, following_id: null } : p
                    ),
                },
            }));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/profiles/?ordering=-followers_count"
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data,
                }));
            } catch (err) {
                console.log("Error loading popular profiles.");
            }
        };

        handleMount();
    }, [currentUser]);

    return (
        <Container
            className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"}`}
        >
            {popularProfiles.results.length ? (
                <>
                    <p>Most followed profiles.</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularProfiles.results.slice(0, 4).map((profile) => (
                                <Profile key={profile.id} profile={profile} mobile handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
                            ))}
                        </div>
                    ) : (
                        popularProfiles.results.map((profile) => (
                            <Profile key={profile.id} profile={profile} handleFollow={handleFollow} handleUnfollow={handleUnfollow} />
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles;
