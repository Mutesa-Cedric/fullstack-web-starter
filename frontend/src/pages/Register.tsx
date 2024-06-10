import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import AuthLayout from "../components/layouts/AuthLayout";
import Logo from "../components/Logo";
// @ts-expect-error(no type definitions found )
import { Helmet } from "react-helmet";

export default function Register() {
    const [registering, setRegistering] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRegistering(true);
        setTimeout(() => {
            setRegistering(false);
            notifications.show({
                title: 'Account creation successful',
                message: 'You have successfully created your account',
                color: 'teal',
            })
            navigate("/dashboard")
        }, 2000);
    }

    return (
        <>
            <Helmet>
                <title>Create account</title>
            </Helmet>
            <AuthLayout>
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Already have an account{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                                Login
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6">
                                <AuthInput
                                    label="Full Name"
                                    required
                                    type="text"
                                />

                                <AuthInput
                                    label="Email Address"
                                    required
                                    autoComplete="email"
                                    type="email"
                                />

                                <AuthInput
                                    label="Password"
                                    required
                                    autoComplete="current-password"
                                    type="password"
                                />
                                <AuthInput
                                    label="Repeat Password"
                                    required
                                    autoComplete="current-password"
                                    type="password"
                                />

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        loading={registering}
                                    >
                                        Create account
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}
