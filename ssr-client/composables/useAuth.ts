import {useUserStore} from "~/stores/userStore";
import {IUser} from "~/types/user";
import {authByToken} from "~/client/api/auth";

export const useAuth = async () => {
    const userStore = useUserStore();

    userStore.setAuthPending(true);

    try {
        const user: IUser = await authByToken();

        userStore.setUserData(user);
    } catch (e) {

    }


    userStore.setAuthPending(false);
}