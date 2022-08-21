import {useCookie} from "#imports";
import {Cookies} from "~/types/cookies";

export const useTokenFetch = <T>(request: string, opts?) => {
    const token = useCookie(Cookies.JWT_TOKEN);

    return $fetch<T>(request, {
        ...opts,
        headers: {
            authorization: `Bearer: ${token.value}`,
        }
    })
}