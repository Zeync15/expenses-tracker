import { signIn } from "next-auth/react";
import { GoLock } from "react-icons/go";

// currently not being used
const AccessDenied = () => {
  return (
    <div className="flex flex-grow">
      <div className="absolute inset-1/4">
        <div className="flex justify-center h-[150px]">
          <div className="text-4xl p-4 flex items-center">
            <GoLock />
          </div>

          <div className="p-4">
            <h2>Access Denied</h2>
            <p>This content is only available to logged-in users.</p>
            <p>Please log in to access the content.</p>
            <a onClick={() => signIn()} className="text-blue-500 hover:text-blue-700 underline cursor-pointer">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
