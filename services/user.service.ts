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
  async getplayer() {
    return (
      await apolloClient.query({
        query: Player,
        fetchPolicy: "network-only",
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
  async deleteUser(playerId: string): Promise<Player> {
    console.log("mutacion " + playerId);
    return (
      await apolloClient.mutate({
        mutation: DeleteUser,
        variables: {
          id: playerId,
        },
      })
    ).data?.deleteuser;
  }
}

export default new UserService();