import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavBtnLink from './shared/NavBtnLink';
function Header() {
  const auth = useAuth();
  return (
    <AppBar
      sx={{
        bgcolor: "transparent",
        position: "static",
        boxShadow: "none",
        marginTop: "30px"
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLogedIn ? (
            <>
              <NavBtnLink
                bg="#00fffc"
                to="/chat"
                text="Go to Chat"
                textColor="black"
              />

              <NavBtnLink
                bg="#51538f"
                textColor="white"
                to="/"
                text="Logut"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavBtnLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />

              <NavBtnLink
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header