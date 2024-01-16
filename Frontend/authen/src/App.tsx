import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  name?: string;
  avatar?: string;
}

function App() {
  const [user, setUser] = useState<User>({});

  const handleCredentialResponse = (response: { credential: string }) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const decoded = jwtDecode(response.credential) as User;
    setUser(decoded);
    document.getElementById("buttonDiv")!.hidden = true;
    localStorage.setItem("user", JSON.stringify(decoded));
  };

  const handleLogOut = () => {
    setUser({});
    document.getElementById("buttonDiv")!.hidden = false;
    localStorage.removeItem("user");
  };

  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "338033181927-i87lcvpnude41h26u2q9b9leptnelka8.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv")!, {
        theme: "outline",
        size: "large",
      });
      google.accounts.id.prompt();
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      document.getElementById("buttonDiv")!.hidden = true;
    }
  }, []);

  return (
    <div className="login">
      <div id="buttonDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={handleLogOut}>logout</button>
      )}
      {user && (
        <div>
          <h5>{user.name}</h5>
          <h5>{user.avatar}</h5>
        </div>
      )}
    </div>
  );
}

export default App;
