import { useSelector } from "react-redux";

function useAuth(props) {
  const authInfo = useSelector((state) => state.auth);
  // console.log({ authInfo });
  return authInfo;
}
export { useAuth };
