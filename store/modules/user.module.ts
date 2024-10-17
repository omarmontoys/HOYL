import { isApolloError } from "@apollo/client/errors";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
    Answers,
    DeleteUser,
    Player,
    Players,
    User,

} from "~/gql/graphql";
import UserService from "~/services/user.service";

@Module({ namespaced: true })
class UserModule extends VuexModule {
    public players?: Player[] = undefined;
    public users?: User[] = undefined;
    public id?: User | undefined = undefined;
    public user: User[] | null = null;
    public loadingdelete = false;
    public successdelete = false;
    public loadingPlayersStatus = false;

   


    @Action
    async fetchPlayers() {
        this.context.commit("loadingPlayers", true);
        return await UserService.getPlayers()
            .then((players: Player[]) => {
                console.log(players);
                this.context.commit("playersSuccess", players);
                this.context.commit("loadingPlayers", false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    @Mutation
  public playersSuccess(players: Player[]): void {
    this.players = players;
  }
  @Mutation
  public loadingPlayers(status: boolean) {
    this.loadingPlayersStatus = status;
  }

    @Action({ rawError: true })
    async deletePlayer(playerId: string): Promise<void> {
        this.context.commit("setLoadingDelete", true);
        this.context.commit("setSuccessDelete", false);
        return await UserService.deleteUser(playerId)
            .then((data) => {
                console.log("Llego");
                console.log(data);
                this.context.commit("setDelete", data);
                this.context.commit("setLoadingDelete", false);
                this.context.commit("setSuccessDelete", false);
            })
            .catch((error) => {
                this.context.commit("setLoadingDelete", false);
                console.log(error);
            });
    }
    @Mutation
    public setLoadingDelete(status: boolean) {
        this.loadingdelete = status;
    }
    @Mutation
    public setSuccessDelete(status: boolean) {
        this.successdelete = status;
    }

}
 

export default UserModule;