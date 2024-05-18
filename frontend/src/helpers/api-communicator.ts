import axios from "axios";

axios.defaults.baseURL =
  "https://turbo-winner-9xg9g96xqp5fpr79-5000.app.github.dev/api/v1";
axios.defaults.withCredentials = true;

const loginUser = async (email: string, password: string) => {
  //console.log("Sending login request");
  const res = await axios.post("/user/login", { email, password });

  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export { loginUser };
