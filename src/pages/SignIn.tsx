import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../cognito";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [isError, setIsError] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Username = (data.get("username") as string) || "";
    const Password = (data.get("password") as string) || "";
    let sessionUserAttributes = "";

    const authenticationDetails = new AuthenticationDetails({
      Username,
      Password,
    });

    const cognitoUser = new CognitoUser({
      Pool: userPool,
      Username,
    });
    function handleNewPassword(newPassword: string) {
      cognitoUser.completeNewPasswordChallenge(
        newPassword,
        sessionUserAttributes,
        {
          onFailure: (err) => {
            console.error(err);
          },
          onSuccess: (result) => {
            console.log(result);
          },
        }
      );
    }
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(session, userConfirmationNecessary) {
        console.log(session, userConfirmationNecessary);
        sessionStorage.setItem("isAuthenticated", "true");
        window.dispatchEvent(new Event("storage"));
      },
      onFailure(_err) {
        setIsError(true);
      },
      newPasswordRequired(userAttributes, _requiredAttributes) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.
        // the api doesn't accept this field back
        delete userAttributes.email_verified;

        // store userAttributes on global variable
        sessionUserAttributes = userAttributes;
        handleNewPassword(Password);
      },
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {
            <div>
              {isError && (
                <Typography variant="caption" color="red">
                  *Incorrect username or password
                </Typography>
              )}
            </div>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
