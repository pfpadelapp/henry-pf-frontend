import { Flex } from "@chakra-ui/react";
import { GoogleLogin } from "react-google-login";

const clientId = "927003271837-l4b8egb4pilglgk1vumu8sjsvngbkkl3.apps.googleusercontent.com"

function LoginGoogle(){

    const onSuccess = (res) =>{
        console.log("INGRESO EXITOSO!! usuario actual: ", res.profileObj);
    }
    
    const OnFailure = (res) =>{
        console.log("INGRESO DENEGADO!!: ", res);
    }
    
    return(
        <Flex>
            <GoogleLogin
                clientId={clientId}
                buttonText="Ingresar"
                onSuccess={onSuccess}
                onFailure={OnFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />

        </Flex>
    )
}

export default LoginGoogle;