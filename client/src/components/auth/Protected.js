import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthStatus, selectLoggedInUser } from "../../redux";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);
  const status = useSelector(selectAuthStatus);

  if (status === "loading") {
    return (
      <div className="col-span-1 lg:col-span-3">
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (status === "idle" && !user) {
    return <Navigate to="/home" replace={true}></Navigate>;
  }

  return children;
  // return status === 'loading' ? <div className='col-span-1 lg:col-span-3'><div className="loader"></div></div> : status === 'idle' && !user ? <Navigate to='/login' replace={true}></Navigate> : children
}

export default Protected;
