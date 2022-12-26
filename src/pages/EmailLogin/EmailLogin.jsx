import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/atoms/Button/Button';
import useInput from '../../hooks/use-Input';
import { LoginWrapper, TitleText, InputForm, Label, Input, ErrorP } from '../Login/styled';
import AuthContext from '../../store/auth-context';

export const EmailLogin = props => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const emailRegex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    const {
        value: enteredEmail,
        isValid: entredEmailIsValid,
        hasError: enteredEmailHasError,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput(value => emailRegex.test(value));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordHasError,
        changeHandler: passwordChangeHandler,
        blurHandler: passwordBlurHandler,
        reset: resetPassword,
    } = useInput(value => value.length >= 6);

    let formIsValid = false;

    if (entredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = async e => {
        e.preventDefault();

        if (!entredEmailIsValid || !enteredPasswordIsValid) {
            return;
        }

        const enteredEmailValue = emailInputRef.current.value;
        const enteredPasswordValue = passwordInputRef.current.value;

        const user = {
            user: {
                email: enteredEmailValue,
                password: enteredPasswordValue,
            },
        };

        try {
            await axios
                .post(`${process.env.REACT_APP_BASE_URL}/user/login`, JSON.stringify(user), {
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                .then(res => {
                    authCtx.login(res.data.user.token);
                    navigate('/home');
                });
        } catch (error) {
            if (error.response.stauts === 404) console.log('its error');
        }

        resetEmailInput();
        resetPassword();
    };

    return (
        <LoginWrapper className="login-wrap">
            <TitleText className="title">로그인</TitleText>
            <form onSubmit={formSubmitHandler}>
                <InputForm>
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        type="email"
                        id="email"
                        value={enteredEmail}
                        onBlur={emailBlurHandler}
                        onChange={emailChangeHandler}
                        ref={emailInputRef}
                    />
                    <div>{enteredEmailHasError && <ErrorP>올바른 이메일 양식으로 입력해주세요.</ErrorP>}</div>
                </InputForm>
                <InputForm>
                    <Label htmlFor="pw">비밀번호</Label>
                    <Input
                        type="password"
                        id="pw"
                        value={enteredPassword}
                        onBlur={passwordBlurHandler}
                        onChange={passwordChangeHandler}
                        ref={passwordInputRef}
                    />
                    <div>{enteredPasswordHasError && <ErrorP>올바른 비밀번호 양식으로 입력해주세요.</ErrorP>}</div>
                </InputForm>
                <Button size="large" type={'submit'} disabled={!formIsValid}>
                    로그인
                </Button>
            </form>
        </LoginWrapper>
    );
};

export default EmailLogin;