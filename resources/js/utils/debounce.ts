/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

const debounce = (fn: Function, ms = 300) => {
    let timeout_id: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
        clearTimeout(timeout_id);
        timeout_id = setTimeout(() => fn.apply(this, args), ms);
    };
};

export default debounce;
