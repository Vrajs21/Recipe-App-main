import { useGetIdentity, useOne } from "@refinedev/core";

import { Profile, Loading } from "../components";

const MyProfile = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    });
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userId,
    });
     console.log(data, isLoading, isError);

    const myProfile = data?.data ?? [];
     console.log(myProfile, isLoading, isError);

    if (isLoading) return <Loading />;
    if (isError) return <div>Error</div>;
    return (
        <Profile
          type="My"
          name={Array.isArray(myProfile) ? '' : myProfile.name}
          email={Array.isArray(myProfile) ? '' : myProfile.email}
          avatar={Array.isArray(myProfile) ? '' : myProfile.avatar}
          recipes={Array.isArray(myProfile) ? [] : myProfile.allRecipes}
        />
      );
      
};

export default MyProfile;
