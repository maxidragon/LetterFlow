import {isUserLoggedIn} from "../../logic/auth";

const Main = () => {
    const isLoggedIn = isUserLoggedIn();
    return (
        <>
            {
                isLoggedIn ? (
                    <>
                        conversations
                    </>
                ) : (
                    <>welcome</>
                )
            }
        </>
    );
};

export default Main;