import { signIn, signOut, useSession } from "next-auth/react";
import axios from "../axios";

export const useRefreshToken = () => {
  const { data: session } = useSession();
  console.log("line 6", session);

  const refreshToken = async () => {
    const res = await axios.get("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${session?.user.refresh_token}`,
      },
    });

    if (session) {
      session.user.access_token = res.data.access_token;
      session.user.refresh_token = res.data.refresh_token;
    } else {
      signOut()
    }
  };
  return refreshToken;

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.get("/auth/refresh", {
  //       headers: {
  //         Authorization: `Bearer ${session?.user.refresh_token}`,
  //       },
  //     });
  //     if (session) {
  //       session.user.access_token = res.data.access_token;
  //       session.user.refresh_token = res.data.refresh_token;
  //     }
  //     // update().then(r => console.log((r))).catch(err=> console.log(err));
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // return refreshToken;
};
