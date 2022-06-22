import { createEffect, createSignal, Show } from "solid-js";

import { JWT, addToCart } from "cart/cart";

export default ({ id }) => {
    const [loggedIn, setLoggedIn] = createSignal(false);

    createEffect(() => {
        return JWT.subscribe((val) => {
            setLoggedIn(!!val);
        });
    });

    return (
        <Show when={loggedIn()}>
            <button
                onClick={() => addToCart(id)}
                class="bg-red-900 text-white py-2 px-5 rounded-md text-sm mt-5"
            >
                Add To Cart
            </button>
        </Show>
    );
};
