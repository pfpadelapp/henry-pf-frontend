import { useColorMode } from "@chakra-ui/color-mode"
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const ToggleColorMode = () => {
    const {colorMode, toggleColorMode}= useColorMode();
    return(
        <Button onClick={()=>toggleColorMode()}>
            {colorMode === "dark" ? <SunIcon/> : <MoonIcon/>}
        </Button>
    )
}

export default ToggleColorMode;