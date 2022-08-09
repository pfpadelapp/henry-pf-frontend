import { Flex } from "@chakra-ui/react";
import { GoogleLogout } from "react-google-login";

const clientId = "927003271837-l4b8egb4pilglgk1vumu8sjsvngbkkl3.apps.googleusercontent.com"

function LogoutGoogle(){

    const onSuccess = (res) =>{
        console.log("INGRESO EXITOSO!! usuario actual: ", res.profileObj);
    }
    
    const onFailure = (res) =>{
        console.log("INGRESO DENEGADO!!: ", res);
    }
    
    return(
        <Flex>
            <GoogleLogout
                clientId={clientId}
                buttonText="cerrar sesion"
                onLogoutSuccess={onSuccess}
            />

        </Flex>
    )
}

export default LogoutGoogle;