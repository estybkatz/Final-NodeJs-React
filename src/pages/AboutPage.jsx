import { Container, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";

import React from "react";
const AboutPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h1">About Us</Typography>
      <Typography className="aboutText">
        <p>
          Welcome to the Worker Management System project! i'm excited to share
          more about the project .
        </p>
        <br />
        <br />
      </Typography>
      <Typography variant="h4" color="primary">
        Project Overview
      </Typography>
      <Typography className="aboutText">
        The Worker Management System is a full-stack application designed to
        streamline worker management tasks. With a Node.js server and a React
        frontend, the system handles three MongoDB databases for workers, tasks,
        and customers. It provides CRUD operations for workers and a
        comprehensive management interface for administrators
        <br />
        <br />
      </Typography>
      <Typography variant="h4" color="primary">
        How It Works
      </Typography>
      <Typography className="aboutText">
        Our platform is easy to use and requires no technical expertise.
        <br />
        We have two types of workers, an admin and a worker. Every worker
        handles his own tasks, and admins can see and manage the tasks of all
        workers.
        <br /> <br />
      </Typography>
      <Typography variant="h4" color="primary">
        Our Goals
      </Typography>
      <Typography className="aboutText">
        <ul>
          <li>
            • <strong>Efficiency:</strong> Simplify worker management tasks and
            improve overall efficiency in task allocation and completion.
          </li>
          <li>
            • <strong>Transparency:</strong> Provide transparency in task status
            and worker performance, empowering administrators to make informed
            decisions.
          </li>
          <li>
            • <strong>Scalability:</strong> Design the system to be scalable,
            accommodating the growth of worker teams and task complexity.
          </li>
        </ul>
        <br />
        <br />
      </Typography>

      <Typography variant="h4" color="primary">
        Contact Me
      </Typography>
      <Typography className="aboutText">
        <p>
          I appreciate your interest in the Worker Management System project. If
          you have questions, suggestions, or would like to contribute, feel
          free to contact me
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:estybkatz@gmail.com">estybkatz@gmail.com</a>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/estybkatz"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </a>
            </li>
          </ul>
          We value your input and are always looking for ways to improve our
          platform and better serve our users. <br />
          <br />
          <br />
        </p>
        <br />
        <br />
      </Typography>
      <Typography variant="h2" color="primary">
        Site Structure
      </Typography>
      <Typography>
        <br />
      </Typography>

      <Typography variant="h4" color="primary">
        Users{" "}
      </Typography>
      <Typography className="aboutText">
        Every System has a first admin, (generated by us)<br></br>
        The admin can register new workers, and manage the tasks of all workers.
        <br />
        The regular users can add tasks, view their own tasks, and set them as
        done.
      </Typography>

      <Typography variant="h4" color="primary">
        The Navbar
      </Typography>
      <Typography className="aboutText">
        The site contains an upper navbar, which changes according to whether
        the user is logged in or not, allowing navigation to the pages allowed
        for the user.
        <br />
        The Navbar contains a search function, which will search in the current
        page.
        <br />
        If the user is logged in, the navbar contains an avatar that allows the
        user to edit his profile or logout.
        <br /> The Navbar contains a sun/moon icon to change the theme of the
        site from dark to light. <br />
        <br />
      </Typography>

      <Typography variant="h4" color="primary">
        The Card Pages
      </Typography>
      <Typography className="aboutText">
        The site has 4 different ways to view cards.
        <br /> All the cards in the homepage.
        <br />
        The Fav Cards page, in which you can view your favorite cards.
        <br />
        My Cards page in which you can view the cards you created. <br /> <br />
      </Typography>
      <Typography variant="h4" color="primary">
        The Footer
      </Typography>
      <Typography className="aboutText">
        The site contains a footer which links to the about page, and favorites
        page and my cards. <br /> <br />
      </Typography>
      <Typography variant="h4" color="primary">
        User types and options
      </Typography>
      <Typography className="aboutText">
        Available options for users This site has 3 types of users, a regular
        user, a business user and an admin user.
        <br />
        All registered users can favorite cards, and view only the cards they
        favorited. A favorited card has the heart shaped favorite button colored
        red, while an unfavorited card has it colored blue. <br /> A user can
        view their favorite cards using favCards page.
        <br />
        A business user can add new cards using the <AddCircleIcon /> button,
        and view the cards he added in the My Cards page.
        <br />
        After creating a card, a business user can edit or delete the cards he
        made.
        <br />
        An Admin user is a business user, which can also delete cards that any
        user made.
        <br />
        When registering you may choose to be a business user or a regular user,
        you cannot become an admin user while registering. To become an admin,
        please contact us by email.
        <br /> Any user can edit his profile pages. <br /> <br />
      </Typography>
      <Typography variant="h2" position="center" color="red">
        Here is an example of a card
      </Typography>
      <img src="/assets/images/card.PNG" alt="card" className="aboutCard" />
      {/* <img src="/assets/images/card.PNG" alt="card" /> */}
    </Container>
  );
};

export default AboutPage;
