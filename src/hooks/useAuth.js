import { useSelector } from "react-redux";

function useAuth(props) {
  const authInfo = useSelector((state) => state.auth);
  return authInfo;
}
export { useAuth };
