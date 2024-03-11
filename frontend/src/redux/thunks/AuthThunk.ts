import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { GoogleUserType } from "..";

export const loginWithGoogleThunk = async(dummy:null,thunkApi: { rejectWithValue: (arg0: unknown) => void; }):Promise<GoogleUserType>=>{
    try {
        console.log(dummy)
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
        return {
            accessToken:token!,
            displayName:user.email!,
            email:user.displayName!,
            isAnonymous:user.isAnonymous,
            emailVerified:user.emailVerified,
            phoneNumber:user.phoneNumber,
            photoURL:user.photoURL!
        };
    } catch (error) {
        // Handle Errors here.
        thunkApi.rejectWithValue(error);
        throw error; // Rethrow the error to reject the thunk
    }
}