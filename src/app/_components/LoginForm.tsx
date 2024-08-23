"use client";

import { useReducer } from "react";
import cn from "classnames";
import { api } from "~/trpc/react";
import { assignReducer, getFirstZodMessage } from "~/utils/utils";
import { passwordSchema, usernameSchema } from "~/utils/schema";

const initialState = {
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
};
type LoginFormState = typeof initialState;
type LoginFormProps = Parameters<typeof api.auth.login.useMutation>[0]

export default function LoginForm(props: LoginFormProps) {
    const [state, dispatch] = useReducer(assignReducer<LoginFormState>, initialState);
    const mutation = api.auth.login.useMutation(props);

    const cls = 'w-full';
    const inputCls = cn(cls, 'input input-bordered input-primary');
    const submitCls = cn(cls, 'btn', mutation.isPending ? 'btn-disabled' : 'btn-primary');
    const errorCls = 'text-xs text-error';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const usernameError = getFirstZodMessage(usernameSchema, state.username);
        const passwordError = getFirstZodMessage(passwordSchema, state.password);
        dispatch({ usernameError, passwordError });
        if (usernameError || passwordError) {
            return;
        }
        mutation.mutate({
            username: state.username,
            password: state.password
        });
    };

    return (<form className='space-y-4' onSubmit={handleSubmit}>
        <div className='relative'>
            <p className={errorCls}>{state.usernameError}</p>
            <input className={inputCls}
                type='text'
                placeholder='用户名'
                value={state.username}
                onChange={(e) => dispatch({ username: e.target.value })}
            />
        </div>

        <div className='relative'>
            <p className={errorCls}>{state.passwordError}</p>
            <input className={inputCls}
                type='password'
                placeholder='密码'
                value={state.password}
                onChange={(e) => dispatch({ password: e.target.value })}
            />
        </div>

        <button className={submitCls}
            type='submit'>登录</button>

    </form>)
}