import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description: "A js library",
    owner: "facebook",
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(<RepositoriesListItem repository={repository} />);
}

test("shows a link to the github homepage for this repository", () => {
  <MemoryRouter>renderComponent()</MemoryRouter>;
});
