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
    repeatPassword: '',
    repeatPasswordError: '',
};
type RegisterFormState = typeof initialState;
type RegisterFormProps = Parameters<typeof api.auth.register.useMutation>[0]

export default function RegisterForm(props: RegisterFormProps) {

    const [state, dispatch] = useReducer(assignReducer<RegisterFormState>, initialState);
    const mutation = api.auth.register.useMutation(props);

    const cls = 'w-full mb-4';
    const inputCls = cn(cls, 'input input-bordered input-primary');
    const submitCls = cn(cls, 'btn', mutation.isPending ? 'btn-disabled' : 'btn-primary');
    const errorCls = 'text-xs text-error';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const usernameError = getFirstZodMessage(usernameSchema, state.username);
        const passwordError = getFirstZodMessage(passwordSchema, state.password);
        const repeatPasswordError = state.password !== state.repeatPassword ? '两次输入的密码不一致' : '';
        dispatch({ usernameError, passwordError, repeatPasswordError });
        if (usernameError || passwordError || repeatPasswordError) {
            return;
        }
        mutation.mutate({
            username: state.username,
            password: state.password
        });
    };

    return (<form onSubmit={handleSubmit}>

        <p className={errorCls}>{state.usernameError}</p>
        <input className={inputCls}
            type='text'
            placeholder='用户名'
            value={state.username}
            onChange={(e) => dispatch({ username: e.target.value })}
        />

        <p className={errorCls}>{state.passwordError}</p>
        <input className={inputCls}
            type='password'
            placeholder='密码'
            value={state.password}
            onChange={(e) => dispatch({ password: e.target.value })}
        />

        <p className={errorCls}>{state.repeatPasswordError}</p>
        <input className={inputCls}
            type='password'
            placeholder='再次输入密码'
            value={state.repeatPassword}
            onChange={(e) => dispatch({ repeatPassword: e.target.value })}
        />

        <button className={submitCls}
            type='submit'>注册</button>
    </form>)
}