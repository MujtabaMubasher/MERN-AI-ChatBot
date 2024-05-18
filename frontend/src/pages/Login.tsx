import { Box, Typography, Button } from "@mui/material";
import Input from "../components/shared/Input";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {

  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email.trim() === "" || password.trim() === "") {
      alert("Both Email and Password are required");

      return;
    }
    //console.log(email,password);
    try {
      if (auth) {
        const promise: Promise<void> = auth?.login(email, password);
        await toast.promise(
          promise,
          {
            loading: "Signing In",
            success: "Signing Successful",
           error: () => `Incorrect Email or Password`,
          },
          {
            id: "login",
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.loading("Signing  Faild", { id: "login" });
    }
  };
  return (
    <Box 
     width={"100%"} 
     height={"100%"} 
     display="flex" flex={1}
    >
      <Box 
       padding={8} 
       display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img 
         src="airobot.png" 
         alt="Robot" 
         style={{ width: "500px", height: "600px" }} 
        />
      </Box>

      <Box 
       display={"flex"}
       flex={{xs:1,md:0.5}}
       justifyContent={"center"}
       alignItems={"center"}
       padding={10}
       ml={"auto"}
       mt={16}
      >
       <form 
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000 ",
            borderRadius: "10px",
            border: "none",
            background: "#001616",
            height: "450px"
          }}
       >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"

            }}
          >

            <Typography
              variant="h4"
              textAlign= "center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <Input 
              type = "email" 
              name="email" 
              label = "Email"
            />
            <Input 
              type = "password" 
              name="password" 
              label = "Password"
            />
            <Button
              type="submit"
              sx = {{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "black",
                ":hover":{
                  bgcolor:"white",
                  color: "black"
                },
              
              }}
              endIcon={<IoIosLogIn />}
             >
              Login
            </Button>
          </Box>

        </form>
      </Box>
    </Box>
  );
}

export default Login;
