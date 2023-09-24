import {Button, CircularProgress, TextField} from "@mui/material";
import {useUserCreateMutation} from "../api/CreateUserApi";
import ErrorPopUp from "./ErrorPopUp";
import {useForm} from "react-hook-form";
import CreateUserModel from "../objects/CreateUserModel";

interface CreateUserProps {
    setCreateUser: any
}

export default function CreateUserComponent(props: CreateUserProps) {
    const [
        createUser,
        { error, isError, isLoading, isSuccess }
    ] = useUserCreateMutation()

    const { register, handleSubmit } = useForm();

    if (isLoading) {
        return <CircularProgress />
    }

    if (isSuccess) {
        return (
            <div>
                <p>User created</p>
                <Button variant="outlined" onClick={e => {
                    props.setCreateUser(false)
                }}>Return</Button>
            </div>
        )
    }

    return (
        <div>
            { isError && <ErrorPopUp error={error} /> }
            <form onSubmit={ handleSubmit((data) => {
                createUser(data as CreateUserModel)
            }) }>
                <TextField
                    label="username" variant="outlined" type="text" {...register("username")}
                />
                <br/>
                <br/>
                <TextField
                    label="password" variant="outlined" type="password" {...register("password")}
                />
                <br/>
                <br/>
                <TextField
                    label="email" variant="outlined" type="email" {...register("email")}
                />
                <br/>
                <Button variant="outlined" type="submit">Create account</Button>
            </form>
            <Button variant="outlined" onClick={e => {
                props.setCreateUser(false)
            }}>Return</Button>
        </div>
    )
}