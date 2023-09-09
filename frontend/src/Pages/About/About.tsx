import { Box, Grid, Link, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 1, md: 3 },
      }}
    >
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h5" gutterBottom>
            About
          </Typography>
          <Typography gutterBottom>
            LetterFlow is an app with which you can make friends around the
            world. Match with someone that shares your passion, write a letter
            and send it. The app is still in development, so there are some
            features that are not yet implemented. The farther away your pen pal
            lives, the longer it will take. Why rush through replies? Make your
            letter be worth the wait!
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Technical details
          </Typography>
          <Typography gutterBottom>
            If you want to check the source code you can do it! LetterFlow is an
            open source project and you can find the code on{" "}
            <Link
              href="https://github.com/maxidragon/LetterFlow"
              underline="hover"
            >
              GitHub
            </Link>
            .
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Contact
          </Typography>
          <Typography>
            If you have any questions to me please write an email to{" "}
            <Link href="mailto:contact@maksymiliangala.com" underline="hover">
              contact@maksymiliangala.com
            </Link>{" "}
            or add me on Discord - maxidragon. In case of bug reports or you
            have suggestions to this website feel free to submit a{" "}
            <Link
              href="https://github.com/maxidragon/LetterFlow/issues"
              underline="hover"
            >
              GitHub issue
            </Link>
            .
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
