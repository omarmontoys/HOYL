import { apolloClient } from "@/provider/apolloprovider";
import {
    Answers,
    DeleteUser,
    Player,
    Players,
    User,
} from "~/gql/graphql";

class UserService {
  async getPlayers() {
    return (
      await apolloClient.query({
        query: Players,
        fetchPolicy: "network-only",
      })
    ).data.players;
  }
  async getplayer(userName: string) {
    return (
      await apolloClient.query({
        query: Player,
        fetchPolicy: "network-only",
        variables: {
          username: userName
        }
      })
    ).data.player;
  }
  async getAnsewrs() {
    return (
      await apolloClient.query({
        query: Answers,
        fetchPolicy: "network-only",
      })
    ).data.answers;
  }
  async deleteUser(userName: string): Promise<Player> {
    console.log("mutacion " + userName);
    return (
      await apolloClient.mutate({
        mutation: DeleteUser,
        variables: {
          userName: userName,
        },
      })
    ).data?.deleteuser;
  }
}

export default new UserService();